/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'qcfoxxdsawhkvmuzbgyx.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qcfoxxdsawhkvmuzbgyx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    ]
  }
};

export default nextConfig;
