// @ts-check

const docs = require('./docs');
const customCssPath = require.resolve('../styles/custom.scss');

/**
 * @type {import('@docusaurus/preset-classic').Options}
 */
const classic = {
  debug: false,
  docs,
  blog: false,
  pages: false,
  sitemap: false,
  theme: { customCss: customCssPath },
  googleAnalytics: undefined,
  gtag: undefined,
};

/**
 * @type {import("@docusaurus/plugin-client-redirects").Options}
 */
const redirects = {
  redirects: [{ from: '/', to: '/docs' }],
};

module.exports = Object.assign({}, { classic, redirects });
