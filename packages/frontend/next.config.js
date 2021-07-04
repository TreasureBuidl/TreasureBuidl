const withTM = require('next-transpile-modules')(['eth-hooks'])
const withPlugins = require('next-compose-plugins')

/**
 * A step in disabling SSR is the rewrites, however, note:
 * These redirects work only in the development environment.
 * In production, you need to have a proxy server like NGINX or use your hosting platform's
 * capabilities (e.g. Netlify's redirects) for doing these redirects.
 */
const nextConfig = {
  reactStrictMode: true,
  target: "serverless",
  webpack5: false,
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    config.module.rules.push({test: /\.yml$/, use: 'raw-loader'})

    return config
  }
}

module.exports = withPlugins([withTM], nextConfig);