const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'JavaScript',
      // link: {
      //   type: 'doc',
      //   id: 'javascript/index',
      // },
      items: [
        {
          type: 'category',
          label: 'object',
          items: ['javascript/object/attributes-of-object-property-in-js'],
        },
      ],
    },
    {
      type: 'category',
      label: 'React',
      // link: {
      //   type: 'doc',
      //   id: 'react/index',
      // },
      items: ['react/suspense'],
    },
  ],
};

module.exports = sidebars;
