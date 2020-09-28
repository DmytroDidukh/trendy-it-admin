import {gql} from '@apollo/client'

import client from "./index";

const getProducts = async () => {
    const response = await client.query({
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

    await client.resetStore()
    return response.data.getProducts
}

const getProductById = async (id) => {
    const response = await client.query({
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
    })

    return response.data.getProductById
}

const addProduct = async (product) => {
    await client.mutate({
        variables: {
            product
        },
        mutation: gql`
            mutation($product: ProductInput!) {
                addProduct(product: $product) {
                    id
                    name
                    images {
                        slider {
                            url
                            publicId
                        }
                        product {
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
    });
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
                    id
                    name
                    images {
                        slider {
                            url
                            publicId
                        }
                        product {
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
    });
};

const deleteProduct = async (id) => {
    const response = await client.mutate({
        variables: {
            id
        },
        mutation: gql`
            mutation($id: ID!) {
                deleteProduct(id: $id) {
                    id
                }
            }
        `
    })

    return response.data.deleteProduct
};

export {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
