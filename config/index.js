// @ts-check

const i18n = require('./i18n');
const presets = require('./presets');
const themeConfig = require('./theme');

/**
 * @type {import('@docusaurus/types').Config}
 */
const config = {
  title: 'pumpkiinbell',
  url: 'https://www.pumpkiinbell.com',
  baseUrl: '/',
  favicon: '/img/meta/favicon.ico',
  trailingSlash: false,
  i18n,
  noIndex: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
  tagline: '개발 이야기와 소소한 잡담을 써놓은 블로그',
  organizationName: 'https://github.com/pumpkiinbell',
  projectName: 'blog',
  themeConfig,
  plugins: ['docusaurus-plugin-sass'],
  themes: [],
  presets: [
    ['classic', presets.classic],
    ['@docusaurus/plugin-client-redirects', presets.redirects],
  ],
  staticDirectories: ['static'],
  scripts: [],
  stylesheets: [],
  clientModules: [],
  titleDelimiter: '|',
  baseUrlIssueBanner: false,
};

module.exports = config;
