// @ts-check

const { i18n, presets, themeConfig } = require('./config');

/**
 * @type {import('@docusaurus/types').Config}
 */
const config = {
  title: 'pumpkinbell',
  url: 'https://pumpkinbell.com',
  baseUrl: '/',
  favicon: '/img/favicon.ico',
  trailingSlash: false,
  i18n,
  noIndex: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
  tagline: '개발 이야기와 소소한 잡담을 써놓은 블로그',
  organizationName: 'https://github.com/jonghopark95',
  projectName: 'blog',
  themeConfig,
  plugins: [],
  themes: [],
  presets: [['classic', presets.classic]],
  staticDirectories: ['static'],
  scripts: [],
  stylesheets: [],
  clientModules: [],
  titleDelimiter: '|',
  baseUrlIssueBanner: false,
};

module.exports = config;
