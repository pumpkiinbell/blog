/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'JavaScript',
      items: [
        {
          type: 'category',
          label: 'Object',
          link: {
            type: 'generated-index',
            title: 'Object',
            description: `
            JavaScript 에서 object 는 property 의 집합이라고 볼 수 있습니다. Property 는 key 와 value 로 구성되어있으며, value 는 어떤 타입이든 담을 수 있습니다.
            Object 섹션에선 JavaScript 에서 object 와 관련하여 가진 특성들을 기술하도록 하겠습니다.
            `,
            slug: '/javascript/object',
            keywords: ['object', 'javascript'],
          },
          items: ['javascript/object/attributes-of-object-property-in-js'],
        },
        {
          type: 'category',
          label: 'Module System',
          link: {
            type: 'generated-index',
            title: 'Module System',
            description: `
            모듈 프로그래밍의 목표는 변수 범위를 사용하는 영역에 한정하고, 전역 공간으로의 노출을 줄이는데에 있습니다.
            Javascript 에서는 ES6 이전까지는 모듈을 언어 자체의 기능으로 제공하지 않았습니다. 2015 년에 이르러서야 이를 언어 자체의 기능으로 탑재하게 되었습니다. 해당 글에선 ES6 이전 JS 에서 Module System 의 역사, ES6 의 Module System 에 대한 특징과 문법을 기술하도록 하겠습니다.
            `,
            slug: '/javascript/module',
            keywords: ['module system', 'es6', 'javascript'],
          },
          items: ['javascript/module/before-es6', 'javascript/module/features', 'javascript/module/syntax'],
        },
      ],
    },
    // {
    //   type: 'category',
    //   label: 'React',
    //   items: ['react/suspense'],
    // },
  ],
};

module.exports = sidebars;
