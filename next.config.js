/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdf-parse'],
  images: {
    domains: ['www.notion.so', 'images.unsplash.com'],
  },
  env: {
    CUSTOM_ENV: process.env.CUSTOM_ENV || 'development',
  },
}

module.exports = nextConfig
