const docsOptions = {
  // meta options
  routeBasePath: 'docs',
  editCurrentVersion: false,
  editLocalizedFiles: false,
  numberPrefixParser: (filename) => ({ filename }),
  breadcrumbs: false,

  // path options
  path: 'docs',
  sidebarPath: require.resolve('./sidebars.js'),

  // versions options
  //   disableVersioning: true,
  //   includeCurrentVersion: false,
  //   versions: {},

  // MDX options
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  //   beforeDefaultRemarkPlugins: [],
  //   beforeDefaultRehypePlugins: [],

  // sidebar options
  sidebarCollapsible: true,
  sidebarCollapsed: false,

  // plugin options
  //   id: '',
  //   include: [],
  //   exclude: [],
  //   docLayoutComponent: '',
  //   docItemComponent: '',
  //   docTagDocListComponent: '',
  //   docTagsListComponent: '',
  //   docCategoryGeneratedIndexComponent: '',
  //   admonitions: {},
  //   tagsBasePath: '',
};

module.exports = docsOptions;
