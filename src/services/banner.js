import {gql} from '@apollo/client'

import client from "./index";

const getBanners = async () =>
await client.query({
    query: gql`
        {
            getBanners {
                id,
                title,
                description,
                image,
                toSlider
            }
        }
    `
});

const getBannerById = async (id) => {
    return await client.query({
        variables: {
            id
        },
        query: gql`
            query($id: ID!) {
                getBannerById(id: $id) {
                    id
                    title
                    description
                    image
                    toSlider
                }
            }
        `
    });
};

const addBanner = async (banner) => {
    await client.mutate({
        variables: {
            banner
        },
        mutation: gql`
            mutation($banner: BannerInput!) {
                addBanner(banner: $banner) {
                    title,
                    description
                    image
                    toSlider
                }
            }
        `
    });
    await client.resetStore();
};

const updateBanner = async ({id, banner}) => {
    await client.mutate({
        variables: {
            id,
            banner
        },
        mutation: gql`
            mutation($id: ID!, $banner: BannerInput!) {
                updateBanner(id: $id, banner: $banner) {
                    title,
                    description
                    image
                    toSlider
                }
            }
        `
    });
    await client.resetStore();
};

const deleteBanner = async (id) => {
    await client.mutate({
        variables: {
            id
        },
        mutation: gql`
            mutation($id: ID!) {
                deleteBanner(id: $id) {
                    title
                }
            }
        `
    })
    await client.resetStore();
};

export {
    getBanners,
    getBannerById,
    addBanner,
    updateBanner,
    deleteBanner
};
