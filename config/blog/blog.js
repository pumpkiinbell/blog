/**
 * @type {import('@docusaurus/plugin-content-blog').PluginOptions}
 */
const blog = {
  blogTitle: 'Blog',
  showReadingTime: true,
  readingTime: ({ content, defaultReadingTime }) => defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
  feedOptions: {
    type: 'all',
    title: 'Blog by pumpkiinbell',
    description: '개발 이야기와 소소한 잡담을 써놓은 블로그',
    language: 'ko',
    copyright: '@ 박종호, All rights reserved',
  },
  blogSidebarCount: 'ALL',
};

module.exports = blog;
