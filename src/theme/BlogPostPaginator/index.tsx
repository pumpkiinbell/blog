import React, { ComponentProps } from 'react';
import BlogPostPaginator from '@theme-original/BlogPostPaginator';
import type BlogPostPaginatorType from '@theme/BlogPostPaginator';
import useUtterance from '@site/src/hooks/useUtterance';

type Props = ComponentProps<typeof BlogPostPaginatorType>;

export default function BlogPostPaginatorWrapper(props: Props) {
  const { anchor } = useUtterance();

  return (
    <>
      <BlogPostPaginator {...props} />
      <div ref={anchor} style={{ marginTop: '50px' }} />
    </>
  );
}
