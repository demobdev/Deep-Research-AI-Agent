/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    EXA_SEARCH_API_KEY: process.env.EXA_SEARCH_API_KEY,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

module.exports = nextConfig 