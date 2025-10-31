import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cn.bing.com',
        pathname: '/th/**',
      },
    ],
  },
  output: 'export',
  basePath: '',
  trailingSlash: true,
};

export default nextConfig;
