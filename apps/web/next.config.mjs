// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


import path from 'path';
import { fileURLToPath } from 'url';

/** Required to simulate __dirname in ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@repo/shared'] = path.resolve(__dirname, '../../packages/shared/dist');
    return config;
  },
  experimental: {
    turbo: false
  }
};

export default nextConfig;

  