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
    alt: 'logo',
    src: '/logos/logo.png',
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

const footer = {};

const prism = {
  theme: lightCodeTheme,
  darkTheme: darkCodeTheme,
};

module.exports = Object.assign({}, { colorMode, navbar, footer, prism });
