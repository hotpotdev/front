
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const isPro = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: isPro,
  productionBrowserSourceMaps: false,
  // assetPrefix: '', //加前缀
  // basePath: '', //node
  distDir: '.next',
  compress: isPro,
  output: isPro ? 'export' : 'standalone',
  images: {
    unoptimized: true
  },
  compiler: {
    removeConsole: isPro ? {
      exclude: ['error', 'info', 'warn']
    } : false
  },
  transpilePackages: [],
  experimental: {
    gzipSize: true,
  },
  cleanDistDir: true,
  trailingSlash: true,
  // 国际化
  // i18n: {
  //   locales: ['en', 'cn'],
  //   defaultLocale: 'en',
  //   localeDetection: false,
  // },
  // proxy
  rewrites: !isPro ? async () => {
    return [
      {
        source: '/api',
        destination: `https://api.server`
      }
    ];
  } : undefined,
  // webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src');
    config.resolve.alias['@@/'] = path.resolve(__dirname, './');
    //  svg
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  }
};

module.exports = withBundleAnalyzer(nextConfig);
