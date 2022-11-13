import React from 'react';
import styled from 'styled-components';
import CircleLoading from '@components/common/loading/CircleLoading';
import { isMobile } from 'react-device-detect';

interface PropsType {
  className?: string;
  msg: string;
  loading?: boolean;
}

const NoDataComp = ({ className, msg, loading = false }: PropsType) => {
  return (
    <div className={className}>
      {/* eslint-disable-next-line react/no-danger */}
      {loading ? <CircleLoading /> : <span className="msg" dangerouslySetInnerHTML={{ __html: msg }} />}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const NoData = styled(NoDataComp)`
  .flex-center; .min-h(400);
  .msg{ .fs(14, 18); .c(@grayScale[@55]); .tc; }
`;

// noinspection LessResolvedByNameOnly
export const MobileNoData = styled(NoDataComp)`
  .flex-center; .min-h(400);
  .msg{ .fs(14, 18); .c(@grayScale[@55]); .tc; }
`;

export default isMobile ? MobileNoData : NoData;
