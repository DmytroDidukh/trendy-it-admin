import { takeEvery, call, put } from 'redux-saga/effects';

import {
        setProducts,
        showLoading,
        hideLoading
} from './product.actions';
import {
        setSnackbarMessage,
        setSnackbarSeverity,
        setSnackbarVisibility,
} from '../snackbar/snackbar.actions';
import {
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct
} from '../../services/product';
import {
        GET_PRODUCTS,
        ADD_PRODUCT,
        UPDATE_PRODUCT,
        DELETE_PRODUCT
} from './product.types';

import { SNACKBAR_MESSAGES } from "../../config";

function* handleProductsLoad() {
        try {
                yield put(showLoading());
                const products = yield call(getProducts);
                yield put(setProducts(products.data.getProducts));
                yield put(hideLoading());
        } catch (error) {
                console.log(error);
        }
}

function* handleAddProduct({ payload }) {
        try {
                yield call(addProduct, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const products = yield call(getProducts);
                yield put(setProducts(products.data.getProducts));
                yield put(hideLoading());

        } catch (err) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.error));
                yield put(setSnackbarVisibility(true));
                console.log('error:', err);
        }
}

function* handleUpdateProduct({ payload }) {
        console.log(payload)
        try {
                yield call(updateProduct, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const products = yield call(getProducts);
                yield put(setProducts(products.data.getProducts));
                yield put(hideLoading());

        } catch (error) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.error));
                yield put(setSnackbarVisibility(true));
                console.log(error);
        }
}

function* handleDeleteProduct({ payload }) {
        try {
                yield call(deleteProduct, payload);

                yield put(setSnackbarSeverity('success'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.success));
                yield put(setSnackbarVisibility(true));

                yield put(showLoading());
                const products = yield call(getProducts);
                yield put(setProducts(products.data.getProducts));
                yield put(hideLoading());

        } catch (error) {
                yield put(setSnackbarSeverity('error'));
                yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.error));
                yield put(setSnackbarVisibility(true));
                console.log(error);
        }
}

export default function* productSaga() {
        yield takeEvery(GET_PRODUCTS, handleProductsLoad);
        yield takeEvery(ADD_PRODUCT, handleAddProduct);
        yield takeEvery(UPDATE_PRODUCT, handleUpdateProduct);
        yield takeEvery(DELETE_PRODUCT, handleDeleteProduct);
}
