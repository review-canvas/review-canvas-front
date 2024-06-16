import withTwin from './with-twin.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@review-canvas/admin-ui', '@review-canvas/theme'],
  experimental: {
    optimizePackageImports: ['@review-canvas/admin-ui', '@review-canvas/theme'],
  },
};

export default withTwin(config);
