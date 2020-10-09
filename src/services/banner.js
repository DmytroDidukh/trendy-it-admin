import { gql } from '@apollo/client';

import client from './index';

const getBanners = async () => {
  const response = await client.query({
    query: gql`
      {
        getBanners {
          id
          title
          description
          image {
            publicId
            url
          }
          toSlider
        }
      }
    `
  });

  await client.resetStore();
  return response.data.getBanners;
};

const getBannerById = async (id) => {
  const response = await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getBannerById(id: $id) {
          id
          title
          description
          image {
            publicId
            url
          }
          toSlider
        }
      }
    `
  });

  return response.data.getBannerById;
};

const addBanner = async (banner) => {
  await client.mutate({
    variables: {
      banner
    },
    mutation: gql`
      mutation($banner: BannerInput!) {
        addBanner(banner: $banner) {
          id
          title
          description
          image {
            publicId
            url
          }
          toSlider
        }
      }
    `
  });
};

const updateBanner = async ({ id, banner }) => {
  await client.mutate({
    variables: {
      id,
      banner
    },
    mutation: gql`
      mutation($id: ID!, $banner: BannerInput!) {
        updateBanner(id: $id, banner: $banner) {
          id
          title
          description
          image {
            publicId
            url
          }
          toSlider
        }
      }
    `
  });
};

const deleteBanner = async (id) => {
  const response = await client.mutate({
    variables: {
      id
    },
    mutation: gql`
      mutation($id: ID!) {
        deleteBanner(id: $id) {
          id
        }
      }
    `
  });

  return response.data.deleteBanner;
};

export { getBanners, getBannerById, addBanner, updateBanner, deleteBanner };
