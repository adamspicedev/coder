/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove deprecated options
  // serverComponentsExternalPackages moved to serverExternalPackages
  // swcMinify is no longer needed in Next.js 15
};

module.exports = nextConfig; 