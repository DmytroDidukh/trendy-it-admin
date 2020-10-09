import { takeEvery, call, put, select } from 'redux-saga/effects';

import {
  setOrders,
  setOrder,
  showLoading,
  hideLoading,
  setOrdersPagination
} from './order.actions';
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../../services/order';
import {
  GET_ORDERS,
  UPDATE_ORDER_STATUS,
  DELETE_ORDER,
  GET_ORDER_BY_ID
} from './order.types';
import { SNACKBAR_MESSAGES } from '../../config';
import {
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarVisibility
} from '../snackbar/snackbar.actions';
import { setProducts } from '../product/product.actions';

function* handleOrdersLoad({ payload }) {
  try {
    yield put(showLoading());
    const orders = yield call(getOrders, payload);

    yield put(setOrdersPagination(orders.pagination));
    yield put(setOrders(orders.orders));

    yield put(hideLoading());
  } catch (error) {
    console.log(error);
  }
}

function* handleGetOrderById({ payload }) {
  try {
    yield put(showLoading());
    const order = yield call(getOrderById, payload);
    yield put(setOrder(order.data.getOrderById));
    yield put(hideLoading());
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateOrderStatus({ payload }) {
  try {
    yield put(showLoading());
    yield call(updateOrderStatus, payload);

    yield put(setSnackbarSeverity('success'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
    yield put(setSnackbarVisibility(true));

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
    yield put(showLoading());
    const order = yield call(deleteOrder, payload);

    yield put(setSnackbarSeverity('success'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.success));
    yield put(setSnackbarVisibility(true));

    const orders = yield call(getOrderFromState);
    const updatedOrders = orders.filter((item) => item.id !== order.id);
    yield put(setOrders(updatedOrders));

    yield put(hideLoading());
  } catch (error) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.error));
    yield put(setSnackbarVisibility(true));
    console.log(error);
  }
}

function* getOrderFromState() {
  return yield select(({ Orders }) => Orders.list);
}

export default function* orderSaga() {
  yield takeEvery(GET_ORDERS, handleOrdersLoad);
  yield takeEvery(GET_ORDER_BY_ID, handleGetOrderById);
  yield takeEvery(UPDATE_ORDER_STATUS, handleUpdateOrderStatus);
  yield takeEvery(DELETE_ORDER, handleDeleteOrder);
}
