import { gql } from '@apollo/client';

import client from './index';

const getProducts = async ({ filter, sort, page, limit = 0 }) => {
  const response = await client.query({
    variables: {
      filter,
      sort,
      page,
      limit
    },
    query: gql`
      query($filter: FilterInput, $sort: String, $page: Int, $limit: Int) {
        getProducts(filter: $filter, sort: $sort, page: $page, limit: $limit) {
          products {
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
            colors
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
          pagination {
            totalDocs
            currentPage
            totalPages
            hasNextPage
            hasPrevPage
          }
        }
      }
    `
  });

  console.log('getProducts', response.data.getProducts);

  return response.data.getProducts;
};

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
              publicId
              url
            }
            product {
              publicId
              url
            }
          }
          colors
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

  return response.data.getProductById;
};

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
          colors
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

const updateProduct = async ({ id, product }) => {
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
          colors
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
  });

  return response.data.deleteProduct;
};

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
