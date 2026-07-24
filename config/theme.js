const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const colorMode = {
  defaultMode: 'dark',
  disableSwitch: false,
  respectPrefersColorScheme: true,
};

const navbar = {
  hideOnScroll: true,
  logo: {
    alt: 'Logo',
    src: '/logos/homepage.png',
    srcDark: '/logos/homepage-dark-mode.png',
    href: '/blog',
    target: '_self',
  },
  items: [
    {
      position: 'left',
      label: 'Blog',
      to: 'blog',
    },
    {
      type: 'search',
      position: 'right',
    },
    {
      position: 'right',
      label: 'GitHub',
      href: 'https://github.com/pumpkiinbell',
    },
    {
      type: 'html',
      position: 'right',
      value: `
        <a
          class="navbar__item navbar__link header-rss-link"
          href="/blog/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          title="RSS 피드 구독"
          aria-label="RSS 피드 구독"
          style="display:flex;align-items:center;"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
          </svg>
        </a>
      `,
    },
  ],
};

const footer = {
  links: [
    {
      html: `
        Powered by <a href="https://docusaurus.io/" target="_blank" rel="noreferrer noopener">Docusaurus 2</a>, Hosted by <a href="https://vercel.com/" target="_blank" rel="noreferrer noopener">Vercel</a>
        <br/>
        @ <a href="https://github.com/pumpkiinbell" target="_blank" rel="noreferrer noopener">박종호</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.ko" target="_blank" rel="noreferrer noopener">All rights reserved.</a>
      `,
    },
  ],
};

const prism = {
  theme: lightCodeTheme,
  darkTheme: darkCodeTheme,
};

const algolia = {
  appId: 'C2S6VDJYN8',
  apiKey: 'a58ba2287b97280a67887fa6f93c78db',
  indexName: 'pumpkiinbell',
  // https://discourse.algolia.com/t/algolia-searchbar-is-not-working-with-docusaurus-v2/14659/2
  contextualSearch: false,
};

const metadata = [
  { name: 'keywords', content: 'blog, javascript, react, frontend' },
  { name: 'author', content: 'Jongho Park' },
  { property: 'og:type', content: 'website' },
  { property: 'og:description', content: 'website' },
  { property: 'og:site_name', content: 'pumpkiinbell.com' },
  { property: 'og:locale', content: 'ko_KR' },
  { property: 'og:image', content: 'https://www.pumpkiinbell.com/img/meta/image.png' },
  { property: 'og:image:secure_url', content: 'https://www.pumpkiinbell.com/img/meta/image.png' },
  { property: 'og:image:type', content: 'image/jpeg' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:image:alt', content: 'Blog Thumbnail' },
];

module.exports = Object.assign({}, { colorMode, navbar, footer, prism, algolia, metadata });
