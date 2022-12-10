import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  children: ReactNode;
}

const JwTableExpendComp = ({ className, children }: PropsType) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const JwTableExpend = styled(JwTableExpendComp)`
    // style
`;

export default JwTableExpend;
