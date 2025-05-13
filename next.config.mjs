/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '5mb', // You can change '5mb' to your desired limit (e.g., '10mb', '50mb')
    }, 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**',
      }
    ]
  }
  };
  
  export default nextConfig;