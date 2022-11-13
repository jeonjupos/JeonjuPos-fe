import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  children: ReactNode;
}

const WgTableExpendComp = ({ className, children }: PropsType) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const WgTableExpend = styled(WgTableExpendComp)`
    // style
`;

export default WgTableExpend;
