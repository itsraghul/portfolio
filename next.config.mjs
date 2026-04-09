import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                react: path.resolve(__dirname, 'node_modules/react'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
                scheduler: path.resolve(__dirname, 'node_modules/scheduler'),
            };
        }
        return config;
    },
    images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '',
      },
      {
        pathname: '/images/logos/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/**',
      },
    ],
  },
};

export default nextConfig;
