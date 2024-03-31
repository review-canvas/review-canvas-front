import withTwin from './with-twin.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@review-canvas/ui'],
  output: 'standalone',
};

export default withTwin(config);
// export default config;
