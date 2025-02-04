import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  env: {
    USER_API: process.env.USER_API,
  },
  output: 'export',
};

export default nextConfig;
