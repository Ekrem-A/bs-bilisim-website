/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
