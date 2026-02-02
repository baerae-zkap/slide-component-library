/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/slide-component-library',
  assetPrefix: '/slide-component-library/',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };

      // Ignore node: protocol imports
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^node:/,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
