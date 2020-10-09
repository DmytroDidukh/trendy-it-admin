import { takeEvery, call, put, select } from 'redux-saga/effects';

import { setBanners, setBanner, setBannersLoading } from './banner.actions';
import {
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarVisibility
} from '../snackbar/snackbar.actions';
import {
  getBanners,
  getBannerById,
  addBanner,
  updateBanner,
  deleteBanner
} from '../../services/banner';
import { setImageToSlider } from '../images/images.actions';
import {
  GET_BANNERS,
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  GET_BANNER_BY_ID
} from './banner.types';

import { SNACKBAR_MESSAGES } from '../../config';

function* handleBannersLoad() {
  try {
    yield put(setBannersLoading(true));
    const banners = yield call(getBanners);
    yield put(setBanners(banners));
    yield put(setBannersLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetBannerById({ payload }) {
  try {
    yield put(setBannersLoading(true));

    const banner = yield call(getBannerById, payload);
    yield put(setImageToSlider(banner.image));
    yield put(setBanner(banner));
    yield put(setBannersLoading(false));
  } catch (err) {
    yield put(setBannersLoading(false));
    console.log('error:', err);
  }
}

function* handleAddBanner({ payload }) {
  try {
    yield call(addBanner, payload);
    yield put(setBannersLoading(true));

    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.success));
    yield put(setSnackbarSeverity('success'));
    yield put(setSnackbarVisibility(true));

    yield put(setBannersLoading(false));
  } catch (err) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.error));
    yield put(setSnackbarVisibility(true));
    yield put(setBannersLoading(false));
    console.log('error:', err);
  }
}

function* handleUpdateBanner({ payload }) {
  try {
    yield put(setBannersLoading(true));
    yield call(updateBanner, payload);

    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
    yield put(setSnackbarVisibility(true));
    yield put(setSnackbarSeverity('success'));

    yield put(setBannersLoading(false));
  } catch (error) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.error));
    yield put(setSnackbarVisibility(true));
    yield put(setBannersLoading(false));
    console.log(error);
  }
}

function* handleDeleteBanner({ payload }) {
  try {
    yield put(setBannersLoading(true));
    const banner = yield call(deleteBanner, payload);

    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.success));
    yield put(setSnackbarVisibility(true));
    yield put(setSnackbarSeverity('success'));

    const banners = yield call(getBannersFromState);
    const updatedBanners = banners.filter((item) => item.id !== banner.id);
    yield put(setBanners(updatedBanners));

    yield put(setBannersLoading(false));
  } catch (error) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.error));
    yield put(setSnackbarVisibility(true));
    yield put(setBannersLoading(false));
    console.log(error);
  }
}

function* getBannersFromState() {
  return yield select(({ Banners }) => Banners.list);
}

export default function* bannerSaga() {
  yield takeEvery(GET_BANNERS, handleBannersLoad);
  yield takeEvery(GET_BANNER_BY_ID, handleGetBannerById);
  yield takeEvery(ADD_BANNER, handleAddBanner);
  yield takeEvery(UPDATE_BANNER, handleUpdateBanner);
  yield takeEvery(DELETE_BANNER, handleDeleteBanner);
}
