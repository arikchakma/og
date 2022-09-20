/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.weserv.nl', 'res.cloudinary.com'],
  }
}

module.exports = nextConfig
