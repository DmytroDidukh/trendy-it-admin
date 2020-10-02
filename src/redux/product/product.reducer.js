import {
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_PRODUCTS_PAGINATION,
  SHOW_LOADING,
  HIDE_LOADING
} from './product.types';

const initialState = {
  list: [],
  pagination: null,
  product: null,
  loading: false
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCT: {
      return {
        ...state,
        product: payload
      };
    }
    case SET_PRODUCTS: {
      return {
        ...state,
        list: payload
      };
    }
    case SET_PRODUCTS_PAGINATION: {
      return {
        ...state,
        pagination: payload
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
      return state;
  }
};

export default productReducer;
