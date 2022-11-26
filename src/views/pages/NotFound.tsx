import React from 'react';
import styled from 'styled-components';

interface PropsType {
    className?: string;
}

const NotFoundComp = ({className}: PropsType) => {
  return (
    <div className={className}>
      404
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const NotFound = styled(NotFoundComp)`

`;

export default NotFound;
