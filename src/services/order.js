import { gql } from '@apollo/client';

import client from './index';

const getOrders = async ({ filter, page }) => {
  const response = await client.query({
    variables: {
      filter,
      page
    },
    query: gql`
      query($filter: FilterInput, $page: Int) {
        getOrders(filter: $filter, page: $page) {
          orders {
            id
            customer {
              name
              surname
              email
              phone
            }
            delivery {
              method
              city
              postOffice
              address {
                street
                built
                apartment
              }
            }
            products {
              name
              price
              quantity
              color
            }
            connectionMethod
            paymentMethod
            deliveryPrice
            orderId
            status
            createdAt
          }
          pagination {
            totalDocs
            totalPages
          }
        }
      }
    `
  });

  await client.resetStore();
  return response.data.getOrders;
};

const getOrderById = async (id) => {
  return await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getOrderById(id: $id) {
          id
          customer {
            name
            surname
            email
            phone
          }
          delivery {
            method
            city
            postOffice
            address {
              street
              built
              apartment
            }
          }
          products {
            name
            price
            quantity
            color
          }
          connectionMethod
          paymentMethod
          deliveryPrice
          orderId
          status
          createdAt
        }
      }
    `
  });
};

const updateOrderStatus = async ({ id, status }) => {
  await client.mutate({
    variables: {
      id,
      status
    },
    mutation: gql`
      mutation($id: ID!, $status: String) {
        updateOrderStatus(id: $id, status: $status) {
          status
        }
      }
    `
  });
};

const deleteOrder = async (id) => {
  const response = await client.mutate({
    variables: {
      id
    },
    mutation: gql`
      mutation($id: ID!) {
        deleteOrder(id: $id) {
          id
        }
      }
    `
  });

  return response.data.deleteOrder;
};

export { getOrders, getOrderById, updateOrderStatus, deleteOrder };
