import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import React from 'react';

const NoSSR = (props: PropsWithChildren) => <React.Fragment>{props.children}</React.Fragment>;

/**
 * use <NoSSR>children</NoSSR>
 */
export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false
});
