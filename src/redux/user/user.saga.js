import {takeEvery, call, put} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
    setAuth,
    setAuthError,
    setLoading,
} from './user.actions';
import {
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarVisibility,
} from '../snackbar/snackbar.actions';
import {
    CHECK_USER_BY_TOKEN,
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER_BY_TOKEN
} from './user.types';
import {
    loginUser,
    getUserByToken,
    updateUserByToken
} from '../../services/user'
import {SNACKBAR_MESSAGES} from "../../config";

function* handleUserLoad({ payload }) {
    try {
        yield put(setLoading(true));
        const user = yield call(loginUser, payload);

        yield put(setSnackbarSeverity('success'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.login.success));
        yield put(setSnackbarVisibility(true));

        localStorage.setItem('AUTH_TOKEN', user.token);
        yield put(setAuth({auth: true, userName: user.name}));

        yield put(setLoading(false));
        yield put(push('/'));

    } catch (error) {
        yield put(setLoading(false));
        yield put(setSnackbarSeverity('error'));
        yield put(setSnackbarMessage(error.graphQLErrors[0].message));
        yield put(setSnackbarVisibility(true));
        yield put(setAuthError(error));
    }
}

function* handleCheckUserByToken() {
    try {
        const authToken = localStorage.getItem('AUTH_TOKEN');
        yield put(setLoading(true));

        if (!authToken) {
            yield put(setLoading(false));
            yield put(setAuth({auth: false, userName: null}));
            yield put(push('/login'));
            return;
        }
        const user = yield call(getUserByToken, authToken);
        yield put(setAuth({auth: true, userName: user.name}));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setLoading(false));
        yield put(setAuth(false));
        localStorage.removeItem('AUTH_TOKEN');
        yield put(push('/login'));
    }
}

function* handleUserLogout() {
    localStorage.removeItem('AUTH_TOKEN');
    yield put(setAuth({auth: false, userName: null}));
    yield put(push('/login'));
}

function* handleUpdateUserByToken({payload: {value, key}}) {
    try {
        yield put(setLoading(true));
        const token = localStorage.getItem('AUTH_TOKEN');
        const user = yield call(updateUserByToken, {value, key, token});

        localStorage.setItem('AUTH_TOKEN', user.token);
        yield put(setSnackbarSeverity('success'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
        yield put(setSnackbarVisibility(true));

        yield put(setAuth({auth: true, userName: user.name}));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setSnackbarSeverity('error'));
        yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.error));
        yield put(setSnackbarVisibility(true));
        console.log(error);
    }
}

export default function* userSaga() {
    yield takeEvery(LOGIN_USER, handleUserLoad)
    yield takeEvery(CHECK_USER_BY_TOKEN, handleCheckUserByToken)
    yield takeEvery(LOGOUT_USER, handleUserLogout)
    yield takeEvery(UPDATE_USER_BY_TOKEN, handleUpdateUserByToken)
}
