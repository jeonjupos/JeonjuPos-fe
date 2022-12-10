import React from 'react';
import styled from 'styled-components';
import { ToastType } from '@/providers/toast/type/toast';
import {ReactComponent as SvgIcoWarning} from '@imgs/icon/ico-warning.svg';
import {ReactComponent as SvgIcoSuccess} from '@imgs/icon/ico-success.svg';

interface PropsType {
  className?: string;
  toast: ToastType;
  close?:() => void;
}

// noinspection LessResolvedByNameOnly
const ToastTemplateStyle = styled.div<{ toast: ToastType }>`
  .wf; .p(20); .tc; .o(0); .t-y(-20);
  .bg { .abs; .trbl(0, 0, 0, 0); .z(1); backdrop-filter: blur(20px);
    &.warning { .bgc(@redNatural[@500]); }

    &.success { .bgc(@oliveNatural[@200]); }
  }
  
  >svg{ .rel; .z(2); .mr(8);
    path { fill: white; }
  }

  .msg { .rel; .z(2); .ib; .vam; .fs(16); .bold; .c(white); word-break: break-all; }

  &.toast-enter { .o(1); .t-y(0);
    transition: opacity ${props => `${props.toast.duration}ms`},
    transform ${props => `${props.toast.duration}ms`};
  }
  &.toast-leave { .o(0); .t-y(-20);
    transition: opacity ${props => `${props.toast.duration}ms`},
    transform ${props => `${props.toast.duration}ms`};
  }

`;

const ToastTemplate = ({ className, toast, close }: PropsType) => {
  return (
    <ToastTemplateStyle className={`toast ${toast.type} ${className}`} tabIndex={-1} role="button" toast={toast} onClick={close}>
      <div className={`bg ${toast.type}`} />
      {toast.type === 'success' ? (
        <SvgIcoSuccess height={16} />
      ) : (
        <SvgIcoWarning height={16} />
      )}
      <span
        className="msg"
        dangerouslySetInnerHTML={{ __html: toast.msg }}
      />
    </ToastTemplateStyle>
  );
};

export default ToastTemplate;
