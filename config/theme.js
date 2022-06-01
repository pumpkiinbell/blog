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

const footer = {
  style: 'dark',
  links: [
    {
      title: 'Docs',
      items: [
        {
          label: 'Tutorial',
          to: '/docs',
        },
      ],
    },
    {
      title: 'Community',
      items: [
        {
          label: 'Stack Overflow',
          href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        },
        {
          label: 'Discord',
          href: 'https://discordapp.com/invite/docusaurus',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/docusaurus',
        },
      ],
    },
    {
      title: 'More',
      items: [
        {
          label: 'Blog',
          to: '/blog',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/facebook/docusaurus',
        },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
};

const prism = {
  theme: lightCodeTheme,
  darkTheme: darkCodeTheme,
};

module.exports = Object.assign({}, { colorMode, navbar, footer, prism });
