import React from 'react';
import BlogPostPaginator from '@theme-original/BlogPostPaginator';
import useUtterance from '../../hooks/useUtterance';

export default function BlogPostPaginatorWrapper(props) {
  const { anchor } = useUtterance();

  return (
    <>
      <BlogPostPaginator {...props} />
      <div ref={anchor} />
    </>
  );
}
