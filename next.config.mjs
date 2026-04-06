/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
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
