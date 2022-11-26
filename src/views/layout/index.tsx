import React from 'react';
import styled from 'styled-components';
import Header from '@/views/layout/Header';

interface PropsType {
    className?: string;
    children: React.ReactNode;
}

// noinspection LessResolvedByNameOnly
const Root = styled.div`

`;

const Layout = ({className, children}: PropsType) => {
  return (
    <Root>
      <Header />
      <div className={className}>
        {children}
      </div>
    </Root>
  );
};

export default Layout;
