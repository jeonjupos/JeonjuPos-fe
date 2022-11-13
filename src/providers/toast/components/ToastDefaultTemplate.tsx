/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';
import { ToastType } from '@/provider/toast/type/toast';

interface PropsType {
  className?: string;
  toast: ToastType;
  close?:() => void;
}

const ToastDefaultTemplateComp = ({ className, toast, close }: PropsType) => {
  return (
    <div className={`toast ${toast.type} ${className}`} tabIndex={-1} role="button" onClick={close}>
      <div className={`bg ${toast.type}`} />

      {(toast.emoji || '').includes('.svg') ? (
        <span className="emoji">
          <img src={toast.emoji} alt="emoji" />
        </span>
      ) : (
        <span
          className="emoji"
          dangerouslySetInnerHTML={{ __html: toast.emoji || '' }}
        />
      )}
      <span
        className="msg"
        dangerouslySetInnerHTML={{ __html: toast.msg }}
      />
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const ToastDefaultTemplate = styled(ToastDefaultTemplateComp)`
  .o(0); .t-y(-20);
  .bg { .abs; .trbl(0,0,0,0); .z(1); backdrop-filter: blur(20px);
    &.warning { .bgc(red); }

    &.success { .bgc(#707385); }
  }

  .emoji { .rel; .z(2); .mr(0); }

  .msg { .rel; .z(2); .ib; .vam; .c(inherit); word-break: break-all; }

    &.toast-enter { .o(1); .t-y(0);
      transition: opacity ${props => `${props.toast.duration}ms`},
      transform ${props => `${props.toast.duration}ms`};
    }
    &.toast-leave { .o(0); .t-y(-20);
      transition: opacity ${props => `${props.toast.duration}ms`},
      transform ${props => `${props.toast.duration}ms`};
    }
  

  @media (@wg-tablet) {

      .wf; .p(20); .br(8);
        &.warning { .c(white); }

        &.success { .c(white); }
      
    

    &.toast-enter { .o(1); .t-y(20);
      transition: opacity ${props => props.toast.duration}ms,
      transform ${props => props.toast.duration}ms;
    }
    &.toast-leave { .o(0); .t-y(0);
      transition: opacity ${props => props.toast.duration}ms,
      transform ${props => props.toast.duration}ms;
    }
  }

  @media (@wg-mobile) {

  }
`;

export default ToastDefaultTemplate;
