const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'CSS',
      link: {
        type: 'doc',
        id: 'css/index',
      },
      items: ['css/CSS 의 스타일 적용 규칙'],
    },
    {
      type: 'category',
      label: 'JavaScript',
      link: {
        type: 'doc',
        id: 'javascript/index',
      },
      items: ['javascript/attributes-of-object-property-in-js', 'javascript/map-weakmap'],
    },
    {
      type: 'category',
      label: 'React',
      link: {
        type: 'doc',
        id: 'react/index',
      },
      items: ['react/suspense', 'react/what-happens-when-you-put-a-function-in-the-initial-value-of-useState'],
    },
    {
      type: 'category',
      label: 'React-Router',
      link: {
        type: 'doc',
        id: 'react-router/index',
      },
      items: ['react-router/useLinkClickHandler'],
    },
    {
      type: 'category',
      label: 'etc',
      link: {
        type: 'doc',
        id: 'etc/index',
      },
      items: ['etc/인코딩, 유니코드', 'etc/URL 에 한글을 쓰면 왜 이상하게 나올까'],
    },
  ],
};

module.exports = sidebars;
