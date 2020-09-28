import {
        SET_PRODUCT,
        SET_PRODUCTS,
        SHOW_LOADING,
        HIDE_LOADING
} from './product.types'

const initialState = {
        list: [],
        product: null,
        loading: false
}

const productReducer = (state = initialState, { type, payload }) => {
        switch (type) {
                case SET_PRODUCT: {
                        return {
                                ...state,
                                product: payload
                        }
                }
                case SET_PRODUCTS: {
                        return {
                                ...state,
                                list: payload
                                    .map((item) => item)
                                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

                        }
                }
                case SHOW_LOADING: {
                        return {
                                ...state,
                                loading: true,
                        }
                }
                case HIDE_LOADING: {
                        return {
                                ...state,
                                loading: false,
                        }
                }
                default:
                        return state
        }
}

export default productReducer;
