import {gql} from '@apollo/client'

import client from "./index";

const getProducts = () =>
client.query({
    query: gql`
        {
            getProducts {
                id,
                name,
                description,
                price,
                oldPrice,
                images {
                    slider {
                        url
                        publicId
                    }
                    product {
                        link
                        url
                        publicId
                    }
                },
                colors {
                    black
                    silver
                    white
                    yellow
                    orange
                    red
                    blue
                    green
                    brown
                    purple
                    pink
                }
                available
                sale
                hot
                newItem
                toSlider                
                createdAt
            }
        }
    `
});

const getProductById = async (id) => (
await client.query({
    variables: {
        id
    },
    query: gql`
        query($id: ID!) {
            getProductById(id: $id) {
                id
                name
                images {
                    slider {
                        url
                        publicId 
                    }
                    product {
                        link
                        url
                        publicId
                    }
                }
                colors {
                    black
                    silver
                    white
                    yellow
                    orange
                    red
                    blue
                    green
                    brown
                    purple
                    pink
                }
                price
                oldPrice
                description
                available
                sale
                hot
                newItem
                toSlider
                createdAt
            }
        }
    `
}))

const addProduct = async (product) => {
    await client.mutate({
        variables: {
            product
        },
        mutation: gql`
            mutation($product: ProductInput!) {
                addProduct(product: $product) {
                    id,
                    name,
                    description,
                    price,
                    oldPrice,
                    images {
                        slider {
                            url
                        }
                        product {
                            url
                        }
                    },
                    sale
                    newItem
                    toSlider
                    createdAt
                }
            }
        `
    });
    await client.resetStore();
};

const updateProduct = async ({id, product}) => {
    await client.mutate({
        variables: {
            id,
            product
        },
        mutation: gql`
            mutation($id: ID!, $product: ProductInput!) {
                updateProduct(id: $id, product: $product) {
                    id,
                    name,
                    description,
                    price,
                    oldPrice,
                    images {
                        slider {
                            url
                            publicId
                        }
                        product {
                            link
                            publicId
                            url
                        }
                    },
                    sale
                    newItem
                    toSlider
                    createdAt
                }
            }
        `
    });
    await client.resetStore();
};

const deleteProduct = async (id) => {
    await client.mutate({
        variables: {
            id
        },
        mutation: gql`
            mutation($id: ID!) {
                deleteProduct(id: $id) {
                    name
                }
            }
        `
    })
    await client.resetStore();
};

export {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
