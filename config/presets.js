const classic = {
  debug: false,
  docs: {
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
