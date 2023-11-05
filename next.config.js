/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
