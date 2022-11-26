import React from 'react';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import TuiStyle from '@components/common/input/tui-editor/TuiStyle';

interface PropsType {
  className?: string;
  value: string;
}

const TuiViewerWrapperComp = ({ className, value }: PropsType) => {
  return (
    <div className={className}>
      <TuiStyle>
        <Viewer initialValue={value} />
      </TuiStyle>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="hide-value" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TuiViewerWrapper = styled(TuiViewerWrapperComp)`
  .hide-value{ .h(0); .crop; }
`;

export default TuiViewerWrapper;
