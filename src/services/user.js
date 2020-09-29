import { gql } from '@apollo/client';

import client from './index';

const loginUser = async (user) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($user: UserInput!) {
        loginUser(user: $user) {
          name
          role
          token
        }
      }
    `,
    variables: { user }
  });
  const { data } = result;

  return data.loginUser;
};

const getUserByToken = async (token) => {
  const result = await client.query({
    query: gql`
      query {
        getUserByToken {
          email
          name
          role
        }
      }
    `,
    context: {
      headers: {
        token
      }
    }
  });
  const { data } = result;

  return data.getUserByToken;
};

const updateUserByToken = async ({ value, key, token }) => {
  const result = await client.mutate({
    variables: {
      value,
      key,
      token
    },
    mutation: gql`
      mutation($value: String!, $key: String!, $token: String!) {
        updateUserByToken(value: $value, key: $key, token: $token) {
          name
          email
          token
        }
      }
    `
  });
  const { data } = result;

  return data.updateUserByToken;
};

export { loginUser, getUserByToken, updateUserByToken };
