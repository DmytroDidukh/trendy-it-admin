import { takeEvery, call, put } from 'redux-saga/effects';

import {
        setOrders,
        showLoading,
        hideLoading
} from './order.actions';
import {
        getOrders,
        updateOrderStatus,
        deleteOrder,
} from '../../services/order';
import {
        GET_ORDERS,
        UPDATE_ORDER_STATUS,
        DELETE_ORDER,
} from './order.types';
import {setSnackbarMessage, setSnackbarSeverity, setSnackbarVisibility} from '../snackbar/snackbar.actions';
import {SNACKBAR_MESSAGES} from '../../config';

function* handleOrdersLoad() {
        try {
                yield put(showLoading());
                const orders = yield call(getOrders);
                yield put(setOrders(orders.data.getOrders));
                yield put(hideLoading());
        } catch (error) {
                console.log(error);
        }
}

function* handleUpdateOrderStatus({ payload }) {
        try {
                yield call(updateOrderStatus, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const purchases = yield call(getOrders);
                yield put(setOrders(purchases.data.getOrders));
                yield put(hideLoading());

        } catch (error) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.error));
                yield put(setSnackbarVisibility(true));
                console.log(error);
        }
}

function* handleDeleteOrder({ payload }) {
        try {
                yield call(deleteOrder, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.success));
                yield put(setSnackbarVisibility(true));


                yield put(showLoading());
                const purchases = yield call(getOrders);
                yield put(setOrders(purchases.data.getOrders));
                yield put(hideLoading());

        } catch (error) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.error));
                yield put(setSnackbarVisibility(true));
                console.log(error);
        }
}

export default function* orderSaga() {
        yield takeEvery(GET_ORDERS, handleOrdersLoad);
        yield takeEvery(UPDATE_ORDER_STATUS, handleUpdateOrderStatus);
        yield takeEvery(DELETE_ORDER, handleDeleteOrder)
}
