import withTwin from './with-twin.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@review-canvas/theme'],
  images: {
    domains: ['romantic-pipe-review-bucket-resize.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default withTwin(config);
