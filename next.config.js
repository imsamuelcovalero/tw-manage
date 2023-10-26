/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
