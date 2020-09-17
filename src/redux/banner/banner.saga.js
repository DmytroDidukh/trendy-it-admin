import { takeEvery, call, put } from 'redux-saga/effects';

import {
        setBanners,
        showLoading,
        hideLoading,
} from './banner.actions';
import {
        setSnackbarMessage,
        setSnackbarSeverity,
        setSnackbarVisibility,
} from '../snackbar/snackbar.actions';
import {
        getBanners,
        addBanner,
        updateBanner,
        deleteBanner
} from '../../services/banner';
import {
        GET_BANNERS,
        ADD_BANNER,
        UPDATE_BANNER,
        DELETE_BANNER
} from './banner.types';

import { SNACKBAR_MESSAGES } from "../../config";

function* handleBannersLoad() {
        try {
                yield put(showLoading());
                const banners = yield call(getBanners);
                yield put(setBanners(banners.data.getBanners));
                yield put(hideLoading());
        } catch (error) {
                console.log(error);
        }
}

function* handleAddBanner({ payload }) {
        try {
                yield call(addBanner, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const banners = yield call(getBanners);
                yield put(setBanners(banners.data.getBanners));
                yield put(hideLoading());

        } catch (err) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.error));
                yield put(setSnackbarVisibility(true));
                console.log('error:', err);
        }
}

function* handleUpdateBanner({ payload }) {
        try {
                yield call(updateBanner, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const banners = yield call(getBanners);
                yield put(setBanners(banners.data.getBanners));
                yield put(hideLoading());

        } catch (error) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.error));
                yield put(setSnackbarVisibility(true));
                console.log(error);
        }
}

function* handleDeleteBanner({ payload }) {
        try {
                yield call(deleteBanner, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const banners = yield call(getBanners);
                yield put(setBanners(banners.data.getBanners));
                yield put(hideLoading());

        } catch (error) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.error));
                yield put(setSnackbarVisibility(true));
                console.log(error);
        }
}

export default function* bannerSaga() {
        yield takeEvery(GET_BANNERS, handleBannersLoad);
        yield takeEvery(ADD_BANNER, handleAddBanner);
        yield takeEvery(UPDATE_BANNER, handleUpdateBanner);
        yield takeEvery(DELETE_BANNER, handleDeleteBanner);
}
