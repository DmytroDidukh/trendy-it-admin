import {
  SET_PRODUCT,
  SET_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SHOW_LOADING,
  HIDE_LOADING
} from './product.types';

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});

export const getProducts = (payload) => ({
  type: GET_PRODUCTS,
  payload
});

export const getProductById = (id) => ({
  type: GET_PRODUCT_BY_ID,
  payload: id
});

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload
});

export const updateProduct = (payload) => ({
  type: UPDATE_PRODUCT,
  payload
});

export const deleteProduct = (payload) => ({
  type: DELETE_PRODUCT,
  payload
});

export const showLoading = () => ({
  type: SHOW_LOADING
});

export const hideLoading = () => ({
  type: HIDE_LOADING
});
