import {
        SET_BANNER,
        SET_BANNERS,
        SET_BANNERS_LOADING,
} from './banner.types'

const initialState = {
        list: [],
        banner: null,
        loading: false
}

const bannerReducer = (state = initialState, { type, payload }) => {
        switch (type) {
                case SET_BANNER: {
                        return {
                                ...state,
                                banner: payload
                        }
                }
                case SET_BANNERS: {
                        console.log(payload, 'bannerReducer')
                        return {
                                ...state,
                                list: payload,
                        }
                }
                case SET_BANNERS_LOADING: {
                        return {
                                ...state,
                                loading: payload,
                        }
                }
                default:
                        return state
        }
}

export default bannerReducer;
