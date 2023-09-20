/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'https://swgoh.gg/api/:path',
      },
    ];
  },
}

module.exports = nextConfig
