/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/video',
        destination: 'https://www.youtube.com/watch?v=0T7W1ZJT6zg',
        permanent: true,
        basePath: false
      },
      {
        source: '/github',
        destination: 'https://github.com/ojpbarbosa/scisight',
        permanent: true,
        basePath: false
      }
    ]
  },
  images: {
    domains: ['upload.wikimedia.org']
  }
}

module.exports = nextConfig
