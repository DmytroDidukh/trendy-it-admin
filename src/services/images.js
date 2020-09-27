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
                    asset_id
                    public_id
                    url
                }
            }
        `
    });
}

export const deleteImage = async (image) => {
    return await client.query({
        variables: {
            image
        },
        query: gql`
            query ($image: String!){
                deleteImage(image: $image) 
            }
        `
    });
}
