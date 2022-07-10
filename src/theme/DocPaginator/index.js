import React from 'react';
import DocPaginator from '@theme-original/DocPaginator';

import useUtterance from '../../hooks/useUtterance';

export default function DocPaginatorWrapper(props) {
  const { anchor } = useUtterance();

  return (
    <>
      <DocPaginator {...props} />
      <div ref={anchor} />
    </>
  );
}
