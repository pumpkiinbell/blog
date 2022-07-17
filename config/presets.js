// @ts-check

const docs = require('./docs');
const blog = require('./blog');
const customCssPath = require.resolve('./styles/custom.scss');
const EnumChangefreq = require.resolve('@docusaurus/preset-classic');

console.log(EnumChangefreq['weekly']);

/**
 * @type {import('@docusaurus/preset-classic').Options}
 */
const classic = {
  debug: false,
  docs,
  blog,
  pages: false,
  sitemap: {
    changefreq: EnumChangefreq['weekly'],
    priority: 0.5,
    ignorePatterns: [],
    filename: 'sitemap.xml',
  },
  theme: { customCss: customCssPath },
  googleAnalytics: undefined,
  gtag: {
    trackingID: 'G-QPZ4TD71N8',
    anonymizeIP: true,
  },
};

module.exports = Object.assign({}, { classic });
