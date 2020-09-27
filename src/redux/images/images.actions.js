import {
    UPLOAD_IMAGE_TO_CLOUD,
    DELETE_IMAGE_FROM_CLOUD,
    SET_IMAGE_TO_PRODUCT,
    SET_ALL_IMAGES_TO_PRODUCT,
    SET_IMAGE_TO_SLIDER,
    DELETE_IMAGE_FROM_STATE,
    SET_LOADING,
    CLEAR_UPLOAD_STATE,
} from './images.types'

export const uploadImageToCloud = (image, isSliderImg) => ({
    type: UPLOAD_IMAGE_TO_CLOUD,
    payload: {
        image,
        isSliderImg
    }
});

export const deleteImageFromCloud = (imageId) => ({
    type: DELETE_IMAGE_FROM_CLOUD,
    payload: imageId
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

export const deleteImageFromState = (newImages) => ({
    type: DELETE_IMAGE_FROM_STATE,
    payload: newImages
})

export const clearUploadState = () => ({
    type: CLEAR_UPLOAD_STATE
})

export const setLoading = (status) => ({
    type: SET_LOADING,
    payload: status
})
