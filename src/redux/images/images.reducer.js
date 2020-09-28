import {
    SET_IMAGE_TO_PRODUCT,
    SET_ALL_IMAGES_TO_PRODUCT,
    SET_IMAGE_TO_SLIDER,
    SET_IMAGE_TO_DELETE_AND_UPDATE_STATE,
    CLEAR_IMAGES_STATE,
    SET_IMAGE_LOADING,
    SET_SLIDER_IMAGE_LOADING,
} from './images.types'

const initialState = {
    sliderImage: null,
    images: [],
    imagesToDelete: [],
    imageLoading: false,
    sliderImageLoading: false,
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
        case SET_IMAGE_LOADING: {
            return {
                ...state,
                imageLoading: payload,
            }
        }
        case SET_SLIDER_IMAGE_LOADING: {
            return {
                ...state,
                sliderImageLoading: payload,
            }
        }
        case CLEAR_IMAGES_STATE: {
            return {
                ...initialState
            }
        }
        default:
            return state
    }
}

export default imagesReducer;
