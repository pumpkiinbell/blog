const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const colorMode = {
  defaultMode: 'light',
  disableSwitch: false,
  respectPrefersColorScheme: true,
};

const navbar = {
  title: 'My Site',
  logo: {
    alt: 'My Site Logo',
    src: '../static/img/logo.svg',
  },
  items: [
    {
      type: 'doc',
      docId: 'intro',
      position: 'left',
      label: 'Tutorial',
    },
    { to: '/blog', label: 'Blog', position: 'left' },
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
          to: '/docs/intro',
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

module.exports = Object.assign(
  {},
  {
    colorMode,
    navbar,
    footer,
    prism,
  },
);
