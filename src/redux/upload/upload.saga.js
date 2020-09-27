import {takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {
    setImageToProduct,
    setImageToSlider,
    setLoading,
} from './upload.actions';
import {
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarVisibility,
} from '../snackbar/snackbar.actions';
import {
    UPLOAD_IMAGE_TO_CLOUD,
    DELETE_IMAGE_FROM_CLOUD,
} from './upload.types';
import {
    uploadFile,
    deleteFile,
} from '../../services/upload'
import {SNACKBAR_MESSAGES} from "../../config";

function* handleImageUpload({payload}) {
    try {

        const {image, isSliderImg} = payload

        yield put(setLoading(true));

        const uploadResult = yield call(uploadFile, image)
        const uploadedImg = uploadResult.data.uploadFile


        if (isSliderImg) {
            yield put(setImageToSlider(uploadedImg));
        } else {
            yield put(setImageToProduct(uploadedImg));
        }

        yield put(setSnackbarSeverity('success'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.upload.success));
        yield put(setSnackbarVisibility(true));

        yield put(setLoading(false));

    } catch (e) {
        yield put(setLoading(false));
        yield put(setSnackbarSeverity('error'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.upload.error));
        yield put(setSnackbarVisibility(true));
    }
}

export default function* uploadSaga() {
    yield takeEvery(UPLOAD_IMAGE_TO_CLOUD, handleImageUpload)
}
