import React, { ForwardedRef, forwardRef, MutableRefObject, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { scrollFreeze, scrollRelease } from '@/utils/browserUtils';

interface PropsType {
  className?: string;
  direction?: 'top' | 'bottom';
  customStyle?: string;
  children: React.ReactNode;
  maxHeight?: number;
  parentEl: HTMLSpanElement;
  inputEl: HTMLInputElement;
  searchText?: string;
  setClose: () => void;
  onClick: () => void;
}

const MARGIN = 5;

const DropBoxWrapComp = forwardRef(({ className, children, inputEl, parentEl, maxHeight = 200, searchText, direction = 'bottom', customStyle = '', setClose, onClick }: PropsType, ref: ForwardedRef<HTMLDivElement>) => {
  const checkTopBottomSpace = useCallback((top: number, clientHeight: number) => {
    const windowTop = window.scrollY;
    const windowBottom = window.scrollY + window.innerHeight;

    if (direction === 'top' && top - clientHeight + MARGIN < windowTop) direction = 'bottom';
    else if (direction === 'bottom' && top + maxHeight + MARGIN > windowBottom) direction = 'top';
  }, []);

  const calculatePosition = useCallback((el: HTMLSpanElement) => {
    const { clientWidth, clientHeight } = el;
    const dropElHeight = ref ? (ref as MutableRefObject<HTMLDivElement>).current.clientHeight : 0;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const { left } = rect;
    let positionStyle = `width:${clientWidth}px; max-height: ${maxHeight}px; ${customStyle}`;

    checkTopBottomSpace(top, dropElHeight);

    switch (direction) {
      case 'top':
        positionStyle += `top: ${top - dropElHeight - MARGIN}px; left: ${left}px; transform-origin: bottom; animation: select-option-slide 0.1s;`;
        break;
      case 'bottom':
        positionStyle += `top: ${top + clientHeight + MARGIN}px; left: ${left}px; transform-origin: top; animation: select-option-slide 0.15s;`;
        break;
      default:
        break;
    }

    return positionStyle + customStyle;
  }, [maxHeight, customStyle, checkTopBottomSpace, direction, ref]);

  useEffect(() => {
    if (ref) {
      const el = (ref as MutableRefObject<HTMLDivElement>).current;
      const position = calculatePosition(parentEl);
      const activeEl = el.querySelector('.active') as HTMLDivElement;
      el.scrollTo(0, activeEl?.offsetTop ?? 0);
      el.setAttribute('style', position);
    }
  }, [calculatePosition, parentEl, ref]);

  useEffect(() => {
    if (ref) {
      const el = (ref as MutableRefObject<HTMLDivElement>).current;
      const matchEl = el.querySelector('.match') as HTMLDivElement;
      if (matchEl) el.scrollTo(0, matchEl.offsetTop);
    }
  }, [searchText, ref]);

  useEffect(() => {
    const closeDrop = () => {
      setClose();
      if (inputEl) inputEl.blur();
    };

    scrollFreeze();

    window.removeEventListener('resize', closeDrop);
    window.addEventListener('resize', closeDrop);

    return () => {
      scrollRelease();
      window.removeEventListener('resize', closeDrop);
    };
  }, []);

  return (
    <div ref={ref} role="button" tabIndex={-1} className={`${className} ${direction}`} onClick={onClick}>
      {children}
    </div>
  );
});

// noinspection LessResolvedByNameOnly
const DropBoxWrap = styled(DropBoxWrapComp)`
  .abs; .z(10000); .max-h(0); .crop; will-change: transform, opacity;
  &.option-box{ .bgc(#fff); .-a(@grayScale[@e6]); .br(6); .scroll-y; }

  @keyframes select-option-slide {
    from { transform: scaleY(0.3); opacity: 0; }
    to { transform: scaleY(1); opacity: 1; }
  }
`;

export default DropBoxWrap;
