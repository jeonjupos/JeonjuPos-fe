import React from 'react';
import styled from 'styled-components';
import Header from '@/views/layout/Header';

interface PropsType {
    className?: string;
    children: React.ReactNode;
}

// noinspection LessResolvedByNameOnly
const Root = styled.div`
  .container{ .h(calc(100vh - 83px)); }
`;

const Layout = ({className, children}: PropsType) => {
  return (
    <Root className={className}>
      <Header />
      <div className="container">
        {children}
      </div>
    </Root>
  );
};

export default Layout;
