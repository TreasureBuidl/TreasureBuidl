/**
 * A step in disabling SSR is the rewrites, however, note:
 * These redirects work only in the development environment.
 * In production, you need to have a proxy server like NGINX or use your hosting platform's
 * capabilities (e.g. Netlify's redirects) for doing these redirects.
 */
module.exports = {
  reactStrictMode: true,
  target: "serverless",
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
}
