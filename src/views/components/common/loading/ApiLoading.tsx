import React from 'react';
import styled from 'styled-components';
import Loading from '@components/common/loading/Loading';
import { useTypedSelector } from '@/store';
import { shallowEqual } from 'react-redux';

interface PropsType {
  className?: string;
}

const ApiLoadingComp = ({ className }: PropsType) => {
  const apiLoading = useTypedSelector(state => state.loadingSlice.apiLoading, shallowEqual);

  return apiLoading ? (
    <div className={className}>
      <Loading />
    </div>
  ) : (<div />);
};

// noinspection LessResolvedByNameOnly
const ApiLoading = styled(ApiLoadingComp)`
  .fix; .trbl(0,0,0,0); .z(100000); .flex-center; .bgc(rgba(0,0,0,0.3));
  ${Loading} { transform: scale(1.8) rotateZ(45deg); }

`;

export default ApiLoading;
