// @ts-check

const i18n = require('./i18n');
const presets = require('./presets');
const themeConfig = require('./theme');

const BASE_URL = '/docs';

/**
 * @type {import('@docusaurus/types').Config}
 */
const config = {
  title: 'pumpkinbell',
  url: 'https://pumpkinbell.com',
  baseUrl: `${BASE_URL}/`,
  favicon: '/img/meta/favicon.ico',
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
