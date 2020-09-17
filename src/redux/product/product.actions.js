import {
        SET_PRODUCT,
        SET_PRODUCTS,
        GET_PRODUCTS,
        ADD_PRODUCT,
        UPDATE_PRODUCT,
        DELETE_PRODUCT,
        SHOW_LOADING,
        HIDE_LOADING
} from './product.types'

export const setProduct = (product) => ({
        type: SET_PRODUCT,
        payload: product
})

export const setProducts = (products) => ({
        type: SET_PRODUCTS,
        payload: products
})

export const getProducts = () => ({
        type: GET_PRODUCTS
})

export const addProduct = (payload) => ({
        type: ADD_PRODUCT,
        payload
})

export const updateProduct = (payload) => ({
        type: UPDATE_PRODUCT,
        payload
})

export const deleteProduct = (payload) => ({
        type: DELETE_PRODUCT,
        payload
})

export const showLoading = () => ({
        type: SHOW_LOADING
})

export const hideLoading = () => ({
        type: HIDE_LOADING
})
