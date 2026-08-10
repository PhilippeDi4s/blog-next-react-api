const nextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.ALLOWED_IMAGE_HOST,
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
