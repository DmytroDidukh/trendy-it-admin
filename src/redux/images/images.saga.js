import {takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {
    setImageToProduct,
    setImageToSlider,
    setImageLoading,
    setSliderImageLoading,
} from './images.actions';
import {
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarVisibility,
} from '../snackbar/snackbar.actions';
import {
    UPLOAD_IMAGE_TO_CLOUD,
    DELETE_IMAGES_FROM_CLOUD,
} from './images.types';
import {
    uploadImage,
    deleteImages,
} from '../../services/images'
import {SNACKBAR_MESSAGES} from "../../config";

function* handleImageUpload({payload}) {
    try {

        const {image, isSliderImg} = payload

        if (isSliderImg) {
            yield put(setSliderImageLoading(true));
        } else {
            yield put(setImageLoading(true));
        }

        const uploadResult = yield call(uploadImage, image)
        const uploadedImg = uploadResult.data.uploadImage


        if (isSliderImg) {
            yield put(setImageToSlider(uploadedImg));
        } else {
            yield put(setImageToProduct(uploadedImg));
        }

        yield put(setSnackbarSeverity('success'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.upload.success));
        yield put(setSnackbarVisibility(true));

        if (isSliderImg) {
            yield put(setSliderImageLoading(false));
        } else {
            yield put(setImageLoading(false));
        }

    } catch (e) {
        yield put(setImageLoading(false));
        yield put(setSliderImageLoading(false));
        yield put(setSnackbarSeverity('error'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.upload.error));
        yield put(setSnackbarVisibility(true));
        console.log(e)
    }
}

function* handleImagesDeleting({payload}) {
    try {
        yield call(deleteImages, payload)

        yield put(setSnackbarSeverity('success'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.deleteImages.success));
        yield put(setSnackbarVisibility(true));

    } catch (e) {
        yield put(setSnackbarSeverity('error'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.deleteImages.error));
        yield put(setSnackbarVisibility(true));
        console.log(e)
    }
}

export default function* imagesSaga() {
    yield takeEvery(UPLOAD_IMAGE_TO_CLOUD, handleImageUpload)
    yield takeEvery(DELETE_IMAGES_FROM_CLOUD, handleImagesDeleting)
}
