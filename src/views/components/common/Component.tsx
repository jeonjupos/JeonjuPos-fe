import React, { ComponentClass, FunctionComponent } from 'react';

const Component = <P extends {}>({ is, props } : { is?: FunctionComponent<P> | ComponentClass<P> | string, props?: any }) : JSX.Element => {
  if (is) return React.createElement(is, props);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<></>);
};

export default Component;
