/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable file system cache to avoid symlink issues in OneDrive
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    // Disable webpack filesystem cache to avoid symlink issues
    webpackBuildWorker: false,
    serverComponentsExternalPackages: [],
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  }
};

export default nextConfig;
