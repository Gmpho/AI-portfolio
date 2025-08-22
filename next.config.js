

/* eslint-env node */
/* global module, __dirname */
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ['pdf-parse'],
  images: {
    domains: ['www.notion.so', 'images.unsplash.com'],
  },
}

module.exports = nextConfig