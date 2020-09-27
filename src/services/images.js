import {gql} from '@apollo/client'

import client from "./index";

export const uploadImage = async (image) => {
    return await client.query({
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
}

export const deleteImage = async (images) => {
    return await client.query({
        variables: {
            images
        },
        query: gql`
            query ($images: [String]){
                deleteImages(images: $images) 
            }
        `
    });
}
