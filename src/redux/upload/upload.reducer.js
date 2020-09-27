import {
    SET_IMAGE_TO_PRODUCT,
    SET_ALL_IMAGES_TO_PRODUCT,
    SET_IMAGE_TO_SLIDER,
    DELETE_IMAGE_FROM_STATE,
    CLEAR_UPLOAD_STATE,
    SET_LOADING,
} from './upload.types'

const initialState = {
    sliderImage: null,
    images: [],
    loading: false,
}

const uploadReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ALL_IMAGES_TO_PRODUCT:
            return {
                ...state,
                images: payload
            };
        case SET_IMAGE_TO_PRODUCT:
            return {
                ...state,
                images: [...state.images, payload],
            };
        case SET_IMAGE_TO_SLIDER:
            return {
                ...state,
                sliderImage: payload,
            };
        case DELETE_IMAGE_FROM_STATE:
            return {
                ...state,
                images: payload
            };
        case SET_LOADING: {
            return {
                ...state,
                loading: payload,
            }
        }
        case CLEAR_UPLOAD_STATE: {
            return {
                ...initialState
            }
        }
        default:
            return state
    }
}

export default uploadReducer;
