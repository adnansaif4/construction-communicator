import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*\/(api|socket)\/.*$/,
      handler: 'NetworkFirst',
      options: { cacheName: 'national-engineers-api', expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 } }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
      handler: 'CacheFirst',
      options: { cacheName: 'national-engineers-media', expiration: { maxEntries: 250, maxAgeSeconds: 60 * 60 * 24 * 30 } }
    }
  ]
});

export default withPWA({
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  experimental: { typedRoutes: true }
});
