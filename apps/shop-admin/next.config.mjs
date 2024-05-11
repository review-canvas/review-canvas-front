import withTwin from './with-twin.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
  transpilePackages: ['@review-canvas/admin-ui', '@review-canvas/theme'],
  experimental: {
    optimizePackageImports: ['@review-canvas/admin-ui', '@review-canvas/theme'],
  },
};

export default withTwin(config);
