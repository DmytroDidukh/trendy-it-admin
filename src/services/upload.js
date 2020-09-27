import {gql} from '@apollo/client'

import client from "./index";

export const uploadFile = async (file) => {
    console.log('file', file)
    return await client.query({
        variables: {
            file
        },
        query: gql`
            query ($file: String!){
                uploadFile(file: $file) {
                    asset_id
                    public_id
                    url
                }
            }
        `
    });
}

export const deleteFile = async (file) => {
    return await client.query({
        variables: {
            file
        },
        query: gql`
            query ($file: String!){
                deleteFile(file: $file) 
            }
        `
    });
}
