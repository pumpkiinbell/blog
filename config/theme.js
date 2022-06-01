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
    src: '/logos/pumpkin-bell.svg',
    href: '/',
    target: '_self',
  },
  items: [
    {
      type: 'doc',
      docId: 'index',
      label: 'Document',
      position: 'left',
    },
    {
      type: 'search',
      position: 'right',
    },
    {
      href: 'https://github.com/facebook/docusaurus',
      label: 'GitHub',
      position: 'right',
    },
  ],
};

const footer = {};

const prism = {
  theme: lightCodeTheme,
  darkTheme: darkCodeTheme,
};

module.exports = Object.assign({}, { colorMode, navbar, footer, prism });
