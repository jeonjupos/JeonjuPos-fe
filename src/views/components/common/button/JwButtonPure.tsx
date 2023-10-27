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
border: 1px solid #000;
font-weight: bold;
cursor: pointer;
transform: scale(1);
transform-origin: center;
  
  &:disabled { 
    opacity: 0.5; 
    cursor: not-allowed; 
  }
  &:active:not(:disabled){ 
    transform: scale(0.98); 
  }
  * {
    pointer-events: none; 
  }
`;

export const WhiteContainBtn = styled(JwButton)`
  color: #000;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 50px;
`;

export const WhiteBorderBtn = styled(JwButton)`
  color: #FFF;
  background: transparent;
  border: 1px solid #FFF;
  border-radius: 50px;
`;

export const BlueContainBtn = styled(JwButton)`
  color: #FFF;
  background: #4465DC;
  border: 1px solid #4465DC;
  border-radius: 50px;
`;

export const GrayBorderBtn = styled(JwButton)`
  color: #69708A;
  background: transparent;
  border: 1px solid #BCBCC8;
  border-radius: inherit;
`;

export default JwButton;
