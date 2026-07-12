/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.learcinet.com',
          },
        ],
        destination: 'https://learcinet.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
