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

module.exports = Object.assign(
  {},
  {
    classic,
  },
);
