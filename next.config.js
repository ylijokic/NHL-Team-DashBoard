/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { 
    domains: [
      'www-league.nhlstatic.com', 
      'nhl.bamcontent.com',
      'localhost',
      'localhost:3000',
    ],
  },
}

module.exports = nextConfig
