import withTwin from './with-twin.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@review-canvas/theme'],
};

export default withTwin(config);
