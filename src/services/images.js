import {gql} from '@apollo/client'

import client from "./index";

export const uploadImage = async (image) => {
    const response = await client.query({
        variables: {
            image
        },
        query: gql`
            query ($image: String!){
                uploadImage(image: $image) {
                    publicId
                    url
                }
            }
        `
    });

    return response.data.uploadImage
}

export const deleteImages = async (images) => {
    const response = await client.query({
        variables: {
            images
        },
        query: gql`
            query ($images: [String]){
                deleteImages(images: $images) 
            }
        `
    });

    return response.data.deleteImages
}
