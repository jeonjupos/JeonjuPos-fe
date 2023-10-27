import React from 'react';
import styled from 'styled-components';
import Ripple, { RippleOption } from '@/views/components/common/Ripple';
import { Skeleton } from '@/views/components/common/Skeleton';

interface PropsType {
  className?: string;
  type?: 'button' | 'submit';
  children: React.ReactNode | string;
  ripple?: RippleOption;
  disabled?: boolean;
  color?: 'indigoVivid-500' | 'indigoBasic-500' | 'indigoBasic-300';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const WgButtonComp = ({ className, type, color, children, ripple, disabled, onClick }: PropsType) => {
  return (
    <Ripple {...ripple}>
      <button type={type} className={`${className} ${color || ''}`} disabled={disabled} onClick={e => onClick && onClick(e)}>
        {children ?? <Skeleton />}
      </button>
    </Ripple>
  );
};

const JwButton = styled(WgButtonComp)`
  .bold; .-a; .pointer; .t-s(1); transform-origin: center;
  &:disabled { .o(0.5); cursor: not-allowed; }
  &:active:not(:disabled){ .t-s(0.98); }
  * { pointer-events: none; }
`;

export const WhiteContainBtn = styled(JwButton)`
  .c(#000); .bgc(#FFF); .-a(#FFF); .br(50);
`;

export const WhiteBorderBtn = styled(JwButton)`
  .c(#FFF); .bgc(transparent); .-a(#FFF); .br(50);
`;

export const BlueContainBtn = styled(JwButton)`
  .c(#FFF); .bgc(#4465DC); .-a(#4465DC); .br(50);
`;

export const GrayBorderBtn = styled(JwButton)`
color: @indigoNatural[@150];
  .c(@indigoNatural[@150]); .bgc(transparent); .-a(@indigoNatural[@80]); .br(inherit);
`;

export default JwButton;
