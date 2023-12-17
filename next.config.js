/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.nhle.com',
        port: '',
      },
    ],
    domains: [
      'assets.nhle.com', 
      'nhl.bamcontent.com',
      'localhost',
      'localhost:3000',
    ],
  },
}

module.exports = nextConfig
