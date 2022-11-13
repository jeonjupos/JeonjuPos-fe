import React from 'react';
import styled from 'styled-components';
import { makeClass } from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
}

const LoadingComp = ({ className }: PropsType) => {
  return (
    <span className={makeClass(['loader', className])} />
  );
};

// noinspection LessResolvedByNameOnly
const Loading = styled(LoadingComp)`
  .wh(48); .c(white); .br(50%); transform: rotateZ(45deg); perspective: 1000px;

  &::before, &::after { .cnt; .abs; .lt(0, 0); .wh(inherit); .br(50%); transform: rotateX(70deg); animation: 1s spin linear infinite; }

  &::after { .c(@indigoNatural[@300]); transform: rotateY(70deg); animation-delay: .4s; }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes spin {
    0%,
    100% {
      box-shadow: .2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: .2em .2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 .2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -.2em .2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -.2em -.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: .2em -.2em 0 0 currentcolor;
    }
  }
`;

export default Loading;
