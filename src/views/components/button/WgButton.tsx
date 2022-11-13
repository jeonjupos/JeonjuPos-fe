import React from 'react';
import styled from 'styled-components';
import Ripple, { RippleOption } from '@components/common/Ripple';
import { Skeleton } from '@components/common/Skeleton';

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

// noinspection LessResolvedByNameOnly
const WgButton = styled(WgButtonComp)`
  .bold; .-a; .pointer; 
  &:disabled { .o(0.5); cursor: not-allowed; }
  * { pointer-events: none; }
  
  &.indigoVivid-500{ .bgc(@indigoVivid[@500]); .-a(@indigoVivid[@500]); .c(#fff); }
  &.indigoBasic-500{ .bgc(@indigoNatural[@500]); .-a(@indigoNatural[@500]); .c(#fff); }
  &.indigoBasic-300{ .bgc(@indigoNatural[@300]); .-a(@indigoNatural[@300]); .c(#fff); }
`;

// noinspection LessResolvedByNameOnly
export const WhiteContainBtn = styled(WgButton)`
  .c(#000); .bgc(#FFF); .-a(#FFF); .br(50);
`;

// noinspection LessResolvedByNameOnly
export const WhiteBorderBtn = styled(WgButton)`
  .c(#FFF); .bgc(transparent); .-a(#FFF); .br(50);
`;

// noinspection LessResolvedByNameOnly
export const BlueContainBtn = styled(WgButton)`
  .c(#FFF); .bgc(#4465DC); .-a(#4465DC); .br(50);
`;

// noinspection LessResolvedByNameOnly
export const GrayBorderBtn = styled(WgButton)`
  .c(@indigoNatural[@150]); .bgc(transparent); .-a(@indigoNatural[@80]); .br(inherit);
`;

export default WgButton;
