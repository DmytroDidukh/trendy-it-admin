import {
        SET_BANNER,
        SET_BANNERS,
        SHOW_LOADING,
        HIDE_LOADING
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
                        return {
                                ...state,
                                list: payload,
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

export default bannerReducer;
