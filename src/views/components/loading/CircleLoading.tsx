import React from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
}

const CircleLoadingComp = ({ className }: PropsType) => {
  return (
    <div className={className}>
      <div className="loader" />
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const CircleLoading = styled(CircleLoadingComp)`
  .loader{
    .rel; .wh(48); .br(50%); animation: circle-rotate 1s linear infinite;
    &::before { .cnt; .abs; .br(50%); .-a(5px, @indigoNatural[@500]); inset: 0; box-sizing: border-box; animation: prixClipFix 2s linear infinite; }

    @keyframes circle-rotate {
      100%   {transform: rotate(360deg)}
    }

    @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    } 
  }
`;

export default CircleLoading;
