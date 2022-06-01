// @ts-check

const sidebarPath = require.resolve('./sidebars');
const customCssPath = require.resolve('./custom.css');

/**
 * @type {import('@docusaurus/preset-classic').Options}
 */
const classic = {
  debug: false,
  docs: {
    path: 'docs',
    routeBasePath: '/',
    sidebarPath,
    breadcrumbs: false,
    sidebarCollapsed: false,
  },
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
