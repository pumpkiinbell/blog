// @ts-check

const docs = require('./docs');
const blog = require('./blog');
const customCssPath = require.resolve('./styles/custom.scss');

/**
 * @type {import('@docusaurus/preset-classic').Options}
 */
const classic = {
  debug: false,
  docs,
  blog,
  pages: false,
  sitemap: false,
  theme: { customCss: customCssPath },
  googleAnalytics: undefined,
  gtag: {
    trackingID: 'G-QPZ4TD71N8',
    anonymizeIP: true,
  },
};

/**
 * @type {import("@docusaurus/plugin-client-redirects").Options}
 */
const redirects = {
  redirects: [{ from: '/', to: '/docs' }],
};

module.exports = Object.assign({}, { classic, redirects });
