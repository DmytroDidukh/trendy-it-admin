import {
  SET_ORDERS,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_ORDER,
  SET_ORDERS_PAGINATION
} from './order.types';

const initialState = {
  list: [],
  pagination: null,
  order: null,
  loading: false
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ORDERS: {
      return {
        ...state,
        list: payload
      };
    }
    case SET_ORDERS_PAGINATION: {
      return {
        ...state,
        pagination: payload
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        order: payload
      };
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return {
        ...state
      };
  }
};

export default orderReducer;
