/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images:{
    domains:["links.papareact.com","fakestoreapi.com"]
  },
  env:{
    stripe_public_key : process.env.STRIPE_PUBLIC_KEY
  }
}

module.exports = nextConfig
