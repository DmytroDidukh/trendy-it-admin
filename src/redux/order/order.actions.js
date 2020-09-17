import {
    SET_ORDER,
    SET_ORDERS,
    GET_ORDERS,
    DELETE_ORDER,
    UPDATE_ORDER_STATUS,
    SHOW_LOADING,
    HIDE_LOADING,
} from './order.types'

export const setOrder = (order) => ({
    type: SET_ORDER,
    payload: order
})

export const setOrders = (orders) => ({
    type: SET_ORDERS,
    payload: orders
})

export const getOrders = () => ({
    type: GET_ORDERS
})

export const deleteOrder = (payload) => ({
    type: DELETE_ORDER,
    payload
})

export const updateOrderStatus = (payload) => ({
    type: UPDATE_ORDER_STATUS,
    payload
})

export const showLoading = () => ({
    type: SHOW_LOADING
})

export const hideLoading = () => ({
    type: HIDE_LOADING
})
