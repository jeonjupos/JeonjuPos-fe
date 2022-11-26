import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./TuiViewerWrapper'), {
  ssr: false,
});

interface PropsType {
  className?: string;
  value?: string | null;
}

const TuiViewerComp = ({ className, value }: PropsType) => {
  return (
    <div className={className}>
      <Viewer value={value || ''} />
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TuiViewer = styled(TuiViewerComp)`
    // style
`;

export default TuiViewer;
