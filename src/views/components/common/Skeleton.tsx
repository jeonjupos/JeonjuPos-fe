import React from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
}

const SkeletonComp = ({ className }: PropsType) => {
  return (
    <div className={`${className} skeleton`}>
      <span>
        <span />
      </span>
      <span>
        <span />
      </span>
      <span>
        <span />
      </span>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
export const Skeleton = styled(SkeletonComp)`
  .crop;
  animation: 1.5s ease-in-out 0.5s infinite normal none running skeleton-image;
  span{ .hide; }

  //> span{
  //  &:first-child{ .block; .wh(100%, inherit); .bgc(#ddd); .br(30); }
  //}

  @keyframes skeleton-image {
    0% { .o(1); }
    50% { .o(0.4); }
    100% { .o(1); }
  }
`;

// noinspection LessResolvedByNameOnly
export const ListSkeleton = styled(Skeleton)`
  animation: 1.5s ease-in-out 0.5s infinite normal none running skeleton-image;
  > span{ 
    &:first-child{ .block; .wh(100%, inherit); .bgc(#ddd); .br(30); }
  }
`;

// noinspection LessResolvedByNameOnly
export const LeagueThumbSkeleton = styled(Skeleton)`
  .crop; .br(16); .bgc(@grayScale[@f0]);  animation: 1.5s ease-in-out 0.5s infinite normal none running skeleton-image;
  > span{ 
    &:nth-of-type(1){ .block; .rel; .z(1); .wf; .bgc(@grayScale[@e6]); .br(30);
      span { .block; .abs; .lt(0); .z(1); .wh(100%); .br(30);
      }
      &::before { .cnt; .pb(140); }
    }
    &:nth-of-type(2) { .block; .p(20);
      &::before{ .cnt; .wh(40,12); .mb(8); .bgc(@grayScale[@e6]); .br(30); }
      >span{ .block; .wh(100%,42); .bgc(@grayScale[@e6]); .br(30); }
      &::after { .cnt; .wh(100%, 34); .mt(8); .bgc(@grayScale[@e6]); .br(30); }
    }

    &:nth-of-type(3) { .block; .p(20); .pt(0);
      &::after{ .cnt; .wh(100%,30); .mt(8); .bgc(@grayScale[@e6]); .br(30); }
    }
  }
`;

// noinspection LessResolvedByNameOnly
export const RosterMemberSkeleton = styled(Skeleton)`
  .crop; .p(20); .br(16); .bgc(@grayScale[@f0]);  animation: 1.5s ease-in-out 0.5s infinite normal none running skeleton-image;
  > span{ 
    &:nth-of-type(1){ .flex; .items-center; .mt(0); .bgc(transparent);
      &::before{ .cnt; .wh(32); .bgc(@grayScale[@e6]); .br(50%); }
      &::after{ .cnt; .wh(100,20); .ml(6); .bgc(@grayScale[@e6]); .br(30);  }
    }
    &:nth-of-type(3){ .block; .mt(40);
      &::before, &::after { .cnt; .wh(100%,20); .mt(8); .bgc(@grayScale[@e6]); .br(30); }
    }
  }
`;
