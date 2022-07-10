const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const colorMode = {
  defaultMode: 'light',
  disableSwitch: false,
  respectPrefersColorScheme: true,
};

const navbar = {
  hideOnScroll: true,
  logo: {
    alt: 'Site Logo',
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
      type: 'doc',
      position: 'left',
      label: 'Documents',
      docId: 'index',
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

module.exports = Object.assign({}, { colorMode, navbar, footer, prism });
