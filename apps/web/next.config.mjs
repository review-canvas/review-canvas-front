import withTwin from './with-twin.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
};

export default withTwin(config);
