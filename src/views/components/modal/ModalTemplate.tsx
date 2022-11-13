import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { makeClass } from '@/utils/forReactUtils';
import { isMobile } from 'react-device-detect';

interface PropsType {
  children: React.ReactNode;
  showCloseBtn?: boolean;
  className?: string;
  animationClass?: string;
  animationDuration?: number;
  useLeaveAnimation?: boolean;
  subject?: string;
  nonModal?: boolean;
  mobile?: 'bottomSheet' | 'full';
  close?: () => void;
}

const DEFAULT_ANIMATION_DURATION = 300;

const ModalTemplate = ({ children, showCloseBtn = false, subject, nonModal, close, className, animationClass = 'fade', animationDuration = DEFAULT_ANIMATION_DURATION, useLeaveAnimation = false, mobile }: PropsType) => {
  const dimEl = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  const realAnimateClass = useMemo(() => {
    const mobileAnimate = mobile ? `${mobile}-animate` : animationClass;
    return isMobile ? mobileAnimate : animationClass;
  }, [animationClass, mobile, isMobile]);

  const closeModal = (dimClosed?: boolean) => {
    if (dimClosed && nonModal) return;
    if (close && dimEl) {
      setOpen(false);
      setTimeout(() => {
        close();
      }, useLeaveAnimation || mobile ? animationDuration : 0);
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTransitionClass(`${open ? 'enter' : 'leave'}`);
    }, 10);
  }, [open]);

  return (
    <div className={makeClass([className, { [mobile as string]: isMobile && !!mobile }])}>
      <div ref={dimEl} tabIndex={-1} role="button" className="dim" onClick={() => closeModal(true)}>dim</div>
      <div className={makeClass([transitionClass, realAnimateClass, 'cont'])}>
        <div className="modal-box">
          {(subject || showCloseBtn) && (
            <div className="modal-hd">
              {showCloseBtn && (
                <div className="btn-close-cont">
                  <button className="btn-modal-close" onClick={() => closeModal()}>
                    <img src="/imgs/icon/ico-close.svg" alt="modal-close" />
                  </button>
                </div>
              )}
              <h6 className="subject">{subject}</h6>
            </div>
          )}
          <div className="modal-bd">{children}</div>
        </div>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
export const ModalStyle = styled(ModalTemplate)`
  .flex-center; .fix; .lt(0,0); .z(1);  .wh(100%);
  
  .fade{ .o(0); transform: scale(0.95); transition: opacity, transform; transition-duration: ${props => `${props.animationDuration || DEFAULT_ANIMATION_DURATION}ms`};
    &.enter { .o(1); transform: scale(1); }
    &.leave { .o(0); transform: scale(0.95); }
  }

  .full-animate{ .o(0); .t-y(70%); transition: opacity, transform; transition-duration: ${props => `${props.animationDuration || DEFAULT_ANIMATION_DURATION}ms`};
    &.enter { .o(1); .t-y(0%); }
    &.leave { .o(0); .t-y(100%); }
  }

  .bottomSheet-animate{ .o(0); .t-y(100%); transition: opacity, transform; transition-duration: ${props => `${props.animationDuration || DEFAULT_ANIMATION_DURATION}ms`};
    &.enter { .o(1); .t-y(0%); }
    &.leave { .o(0); .t-y(100%); }
  }
  
  .dim { .fix; .lt(0,0); .z(1);  .wh(100%); .bgc(rgba(0, 0, 0, 0.5)); text-indent: -999999px; backdrop-filter: blur(0px); transition: all 0.2s;
    &.non-modal { .bgc(transparent);  }
  }

  .cont { .rel; .z(2);  .p(28); .bgc(white); .br(16);
    .modal-box{ .rel;
      .modal-hd{ .mb(32); }
      .btn-close-cont{ .block; .tr;
        .btn-modal-close { .flex-center; .inline-flex; .wh(24);
          > img { .wh(15); }
        }
      }
      .subject { .fs(20, 26); .bold; .c(black); .tc; }
    }
  }
  
  &.full{
    .dim { .o(0); }
    .cont { .max-w(100%); .hf; .p(0, 16, 20, 16); .br(0); 
      .modal-box{ .h(inherit); .scroll-y;
        .modal-hd{ .sticky; .lt(0); .z(@zIndex[@header]); .flex; .space-between; .items-center; flex-direction: row-reverse; .wh(100%, 50); .mb(0); .bgc(white);
          .subject { .fs(20, 20); .bold; .c(black); .tc; }
        }
      }
    }
  }
  
  &.bottomSheet{
    .dim{ backdrop-filter: blur(2px); }
    .cont { .fix; .lb(0); .z(1); .max-w(100%); .p(16, 16, 40, 16); .br-t(24);
      .modal-box{
        .modal-hd{ .mb(40);
          .subject { .fs(18, 23.4); .bold; .c(black); .tc; }
        }
      }
    }
  }
`;

// noinspection LessResolvedByNameOnly
export const BottomModalStyle = styled(ModalTemplate)`
  .dim { .flex-center; .fix; .lt(0,0); .z(1); .wh(100%); .bgc(rgba(0, 0, 0, 0.5)); backdrop-filter: blur(0px);
    .cont { .fix; .lt(0,0); .z(1); .wf; .h(220); .bgc(white); .br-t(20); .t-y(100%); }
  }

  .btn-modal-close {  }

  &.fade-enter-done {
    .dim {
      transition: backdrop-filter ease-out 0.2s;
      backdrop-filter: blur(2px);
    }

    .cont {
      transition: transform ease-out 0.1s 0.25s;
      transform: translateY(0px);
    }
  }
`;

// noinspection LessResolvedByNameOnly
export const FullScreenModalStyle = styled(ModalTemplate)`
  .dim {
    .cont { .fix; .lt(0,0); .z(1); .wh(100%); .bgc(white); }
  }

  .btn-modal-close {  }
`;

// noinspection LessResolvedByNameOnly
export const SelectModalStyle = styled(ModalTemplate)`
  .dim { .flex-center; .fix; .lt(0,0); .z(1); .wh(100%); .bgc(rgba(0, 0, 0, 0.5)); backdrop-filter: blur(0px);
    .cont { .fix; .lt(0,0); .z(1); .wf; .m(8,0); .p(0,16); .bgc(transparent); .t-y(100%); border:none;

      .modal-box { .mb(8); .bgc(rgba(221, 221, 221,0.95)); .br(13);

        &::before{ .cnt('매칭방 더보기'); .block; .p(12, 0); .fs(13, 18); .c(#3c3c43); .tc; .o(0.6); }

        .btn{ .wf; .h(60); .-a; .-t(#b1b1b1, 1); .br(0);
          button{ .fs(20); .c(#007aff); letter-spacing: 0.38px; }
        }
      }
    }
  }

  .btn-modal-close { .block !important; .h(60); .bgc(white); .-a(white); .br(13);
    button { .fs(20); .c(#007aff); .semi-bold; }
  }

  &.fade-enter-done {
    .dim {
      transition: backdrop-filter ease-out 0.2s;
      backdrop-filter: blur(2px);
    }

    .cont {
      transition: transform ease-out 0.1s 0.25s;
      transform: translateY(0px);
    }
  }
`;
