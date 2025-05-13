/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '5mb', // You can change '5mb' to your desired limit (e.g., '10mb', '50mb')
      },
    },
  };
  
  export default nextConfig;