import { takeEvery, call, put, select } from 'redux-saga/effects';

import {
  setProducts,
  setProduct,
  showLoading,
  hideLoading
} from './product.actions';
import {
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarVisibility
} from '../snackbar/snackbar.actions';
import {
  setAllImagesToProduct,
  setImageToSlider
} from '../images/images.actions';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../../services/product';
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from './product.types';
import { SNACKBAR_MESSAGES } from '../../config';

function* handleProductsLoad({ payload }) {
  try {
    yield put(showLoading());
    const products = yield call(getProducts, payload);

    yield put(setProducts(products));

    yield put(hideLoading());
  } catch (error) {
    console.log(error);
  }
}

function* handleGetProductById({ payload }) {
  try {
    yield put(showLoading());
    const product = yield call(getProductById, payload);

    yield put(setAllImagesToProduct(product.images.product));
    yield put(setImageToSlider(product.images.slider));
    yield put(setProduct(product));

    yield put(hideLoading());
  } catch (error) {
    console.log(error);
  }
}

function* handleAddProduct({ payload }) {
  try {
    yield put(showLoading());
    yield call(addProduct, payload);

    yield put(setSnackbarSeverity('success'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.success));
    yield put(setSnackbarVisibility(true));

    yield put(hideLoading());
  } catch (err) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.add.error));
    yield put(setSnackbarVisibility(true));
    console.log('error:', err);
  }
}

function* handleUpdateProduct({ payload }) {
  try {
    yield put(showLoading());
    yield call(updateProduct, payload);

    yield put(setSnackbarSeverity('success'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.success));
    yield put(setSnackbarVisibility(true));

    yield put(hideLoading());
  } catch (error) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.update.error));
    yield put(setSnackbarVisibility(true));
    yield put(hideLoading());
    console.log(error);
  }
}

function* handleDeleteProduct({ payload }) {
  try {
    yield put(showLoading());
    const product = yield call(deleteProduct, payload);

    yield put(setSnackbarSeverity('success'));
    yield put(setSnackbarMessage(SNACKBAR_MESSAGES.delete.success));
    yield put(setSnackbarVisibility(true));

    const products = yield call(getProductsFromState);
    const updatedProducts = products.filter((item) => item.id !== product.id);
    yield put(setProducts(updatedProducts));

    yield put(hideLoading());
  } catch (error) {
    yield put(setSnackbarSeverity('error'));
    yield put(setSnackbarMessage(error.message));
    yield put(setSnackbarVisibility(true));
    yield put(hideLoading());
    console.log(error);
  }
}

function* getProductsFromState() {
  return yield select(({ Products }) => Products.list);
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCTS, handleProductsLoad);
  yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById);
  yield takeEvery(ADD_PRODUCT, handleAddProduct);
  yield takeEvery(UPDATE_PRODUCT, handleUpdateProduct);
  yield takeEvery(DELETE_PRODUCT, handleDeleteProduct);
}
