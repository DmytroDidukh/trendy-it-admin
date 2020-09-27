import {
    SET_IMAGE_TO_PRODUCT,
    SET_ALL_IMAGES_TO_PRODUCT,
    SET_IMAGE_TO_SLIDER,
    SET_IMAGE_TO_DELETE_AND_UPDATE_STATE,
    CLEAR_UPLOAD_STATE,
    SET_LOADING,
} from './images.types'

const initialState = {
    sliderImage: null,
    images: [],
    imagesToDelete: [],
    loading: false,
}

const imagesReducer = (state = initialState, {type, payload}) => {
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
        case SET_IMAGE_TO_DELETE_AND_UPDATE_STATE:
            return {
                ...state,
                images: state.images.filter(img => img.publicId !== payload),
                imagesToDelete: [...state.imagesToDelete, payload]
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

export default imagesReducer;
