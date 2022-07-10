// @ts-check

const docs = require('./docs');
const customCssPath = require.resolve('../styles/custom.scss');

/**
 * @type {import('@docusaurus/preset-classic').Options}
 */
const classic = {
  debug: false,
  docs,
  blog: {
    blogTitle: 'Blog',
    showReadingTime: true,
    readingTime: ({ content, defaultReadingTime }) => defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
    feedOptions: {
      type: 'all',
      copyright: '@ 박종호, All rights reserved',
    },
  },
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
