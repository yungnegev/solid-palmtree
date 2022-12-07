import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'gmz3ys5q',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: 'sklKunsJJzBaHoPsizLqI1ow5EmYh7zYi3zP5zABHL8dNlIj2es9H7nIOHRv1hQx2tVXBhNYk5QGch9ZMzesvoEVhpUHkN97ZT3XAHb5qqTyeX1eRPugDZ0csyry5LGujOOIdGIQPMZd5nHB5msmM0P8z0CKkTCkklaz7SezphFzYejMTY65',
    ignoreBrowserTokenWarning: true
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
/* process.env.NEXT_PUBLIC_SANITY_TOKEN */