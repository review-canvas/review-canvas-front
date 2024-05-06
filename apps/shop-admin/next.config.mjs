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
  transpilePackages: ['@review-canvas/admin-ui'],
  experimental: {
    optimizePackageImports: ['@review-canvas/admin-ui'],
  },
};

export default withTwin(config);
