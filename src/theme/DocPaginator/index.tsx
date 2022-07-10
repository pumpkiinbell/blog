import React, { ComponentProps } from 'react';
import DocPaginator from '@theme-original/DocPaginator';
import type DocPaginatorType from '@theme/DocPaginator';
import useUtterance from '@site/src/hooks/useUtterance';

type Props = ComponentProps<typeof DocPaginatorType>;

export default function DocPaginatorWrapper(props: Props) {
  const { anchor } = useUtterance();

  return (
    <>
      <DocPaginator {...props} />
      <div ref={anchor} style={{ marginTop: '50px' }} />
    </>
  );
}
