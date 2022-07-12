/**
 * @type {import('@docusaurus/plugin-content-docs').PluginOptions}
 */
const docsOptions = {
  // meta options
  routeBasePath: 'docs',
  editCurrentVersion: false,
  editLocalizedFiles: false,
  numberPrefixParser: (filename) => ({ filename }),
  breadcrumbs: false,

  // path options
  path: 'docs',
  sidebarPath: require.resolve('./sidebar'),

  // sidebar options
  sidebarCollapsible: true,
  sidebarCollapsed: false,
};

module.exports = docsOptions;
