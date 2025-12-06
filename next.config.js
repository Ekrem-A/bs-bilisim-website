/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Vercel production optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  // Webmail redirect
  async redirects() {
    return [
      {
        source: '/webmail/:path*',
        destination: 'https://webmail.roundcube.101.hostinglogin.net/:path*',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
