// @ts-check

/**
 * @type {import('@docusaurus/preset-classic').Options}
 */
const classic = {
  debug: false,
  docs: {
    routeBasePath: '/',
    sidebarPath: require.resolve('../sidebars.js'),
  },
  blog: {
    showReadingTime: true,
  },
  theme: {
    customCss: require.resolve('../src/css/custom.css'),
  },
};

/**
 * @type {import("@docusaurus/plugin-client-redirects").Options}
 */
const redirects = {
  redirects: [{ from: '/', to: '/docs' }],
};

module.exports = Object.assign({}, { classic, redirects });
