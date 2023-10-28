/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_API_URL // development api
            : 'http://localhost:3010/api', // production api
    s3_image: process.env.S3_IMAGE
  }
}

module.exports = nextConfig
