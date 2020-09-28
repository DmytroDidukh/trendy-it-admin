import {
    UPLOAD_IMAGE_TO_CLOUD,
    DELETE_IMAGES_FROM_CLOUD,
    SET_IMAGE_TO_PRODUCT,
    SET_ALL_IMAGES_TO_PRODUCT,
    SET_IMAGE_TO_SLIDER,
    SET_IMAGE_TO_DELETE_AND_UPDATE_STATE,
    SET_IMAGE_LOADING,
    SET_SLIDER_IMAGE_LOADING,
    CLEAR_IMAGES_STATE,
} from './images.types'

export const uploadImageToCloud = (image, isSliderImg) => ({
    type: UPLOAD_IMAGE_TO_CLOUD,
    payload: {
        image,
        isSliderImg
    }
});

export const deleteImagesFromCloud = (images) => ({
    type: DELETE_IMAGES_FROM_CLOUD,
    payload: images
})

export const setImageToProduct = (image) => ({
    type:SET_IMAGE_TO_PRODUCT,
    payload: image
});

export const setAllImagesToProduct = (images) => ({
    type:SET_ALL_IMAGES_TO_PRODUCT,
    payload: images
});

export const setImageToSlider = (image) => ({
    type: SET_IMAGE_TO_SLIDER,
    payload: image
});

export const setImagesToDeleteAndUpdateState = (imgId) => ({
    type: SET_IMAGE_TO_DELETE_AND_UPDATE_STATE,
    payload: imgId
})

export const clearImagesState = () => ({
    type: CLEAR_IMAGES_STATE
})

export const setImageLoading = (status) => ({
    type: SET_IMAGE_LOADING,
    payload: status
})

export const setSliderImageLoading = (status) => ({
    type: SET_SLIDER_IMAGE_LOADING,
    payload: status
})
