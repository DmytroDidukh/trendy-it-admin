import {
  SET_ORDER,
  SET_ORDERS,
  GET_ORDERS,
  GET_ORDER_BY_ID,
  DELETE_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_PAGINATION,
  SHOW_LOADING,
  HIDE_LOADING
} from './order.types';

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order
});

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders
});

export const setOrdersPagination = (pagination) => ({
  type: SET_ORDERS_PAGINATION,
  payload: pagination
});

export const getOrders = (payload) => ({
  type: GET_ORDERS,
  payload
});

export const getOrderById = (id) => ({
  type: GET_ORDER_BY_ID,
  payload: id
});

export const deleteOrder = (payload) => ({
  type: DELETE_ORDER,
  payload
});

export const updateOrderStatus = (payload) => ({
  type: UPDATE_ORDER_STATUS,
  payload
});

export const showLoading = () => ({
  type: SHOW_LOADING
});

export const hideLoading = () => ({
  type: HIDE_LOADING
});
