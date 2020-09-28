import {
        SET_BANNER,
        SET_BANNERS,
        GET_BANNERS,
        ADD_BANNER,
        UPDATE_BANNER,
        DELETE_BANNER,
        SET_BANNERS_LOADING,
        GET_BANNER_BY_ID,
} from './banner.types'

export const setBanner = (banner) => ({
        type: SET_BANNER,
        payload: banner
})

export const setBanners = (banners) => ({
        type: SET_BANNERS,
        payload: banners
})

export const getBanners = () => ({
        type: GET_BANNERS
})

export const getBannerById = (id) => ({
        type: GET_BANNER_BY_ID,
        payload: id
})

export const addBanner = (payload) => ({
        type: ADD_BANNER,
        payload
})

export const updateBanner = (payload) => ({
        type: UPDATE_BANNER,
        payload
})

export const deleteBanner = (payload) => ({
        type: DELETE_BANNER,
        payload
})

export const setBannersLoading = (status) => ({
        type: SET_BANNERS_LOADING,
        payload: status
})
