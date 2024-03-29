/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/**',
      }
    ]
  },
  async redirects(){
    return [
      {
        source: '/archive',
        destination: '/articles',
        statusCode: 301,
      },
      {
        source: '/draft',
        destination: '/article/draft',
        statusCode: 301,
      },
    ]
  }
}

module.exports = nextConfig
