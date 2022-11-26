import React, { useCallback, useRef, useId, useEffect } from 'react';
import styled from 'styled-components';

interface PropsType {
  children: React.ReactNode;
  msg: string;
  disabled?: boolean;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  customStyle?: string;
  className?: string;
}

// noinspection LessResolvedByNameOnly
const Root = styled.div`
  .ib;

  @keyframes popover-animation {
    from { .o(0); transform: scale(0.9); }
    to { .o(1); transform: scale(1); }
  }
`;

const Popover = ({ children, className, msg, disabled = false, direction = 'right', customStyle = '' }: PropsType) => {
  const id = useId().replace(/:/gi, '');
  const popoverId = `popover-${id}`;
  const popoverEl = useRef<HTMLDivElement | null>(null);

  const makeDirectionStyle = useCallback((el: HTMLDivElement) => {
    const { clientWidth, clientHeight } = el;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const { left } = rect;
    let popoverStyle = 'position:absolute; z-index:11; width: max-content; padding: 10px 12px; background-color: black; font-size: 14px; color: #fff; border-radius: 8px; animation: popover-animation 0.15s;';
    let arrowStyle = 'position:absolute; z-index:1; width: 0; height: 0; border-bottom: 5px solid transparent; border-top: 5px solid transparent; border-left: 6px solid black; border-right: 5px solid transparent;';

    switch (direction) {
      case 'top':
        popoverStyle += `top: ${top - 10}px; left: ${left + (clientWidth / 2)}px; transform: translate(-50%, -100%); transform-origin: bottom; animation: none;`;
        arrowStyle += 'bottom: -10px; left: 50%; transform: translateX(-50%) rotate(90deg);';
        break;
      case 'bottom':
        popoverStyle += `top: ${top + clientHeight + 10}px; left: 0px; transform-origin: top;`;
        arrowStyle += 'top: -11px; left: 50%; transform: translateX(-50%) rotate(90deg);';
        break;
      case 'left':
        popoverStyle += `top: ${top}px; right: ${window.innerWidth - left + 10}px; transform-origin: left;`;
        arrowStyle += 'top: 50%; right: -11px; transform: translateY(-50%) rotate(0deg);';
        break;
      default:
        popoverStyle += `top: ${top}px; left: ${left + clientWidth + 10}px; transform-origin: left;`;
        arrowStyle += 'top: 50%; left: -11px; transform: translateY(-50%) rotate(180deg);';
        break;
    }

    return { popover: popoverStyle + customStyle, arrow: arrowStyle };
  }, [direction, customStyle]);

  const appendMsg = useCallback(() => {
    if (disabled || !msg) return;

    const el = popoverEl.current as HTMLDivElement;

    const popover = document.createElement('div');
    const arrow = document.createElement('span');
    popover.id = popoverId;
    popover.innerHTML = msg;
    const { popover: popoverStyle, arrow: arrowStyle } = makeDirectionStyle(el);
    popover.setAttribute('style', popoverStyle);
    arrow.setAttribute('style', arrowStyle);

    popover.prepend(arrow);

    document.body.appendChild(popover);
  }, [disabled, popoverId, msg, makeDirectionStyle]);

  const removeMsg = useCallback(() => {
    if (disabled) return;

    const popover = document.querySelector(`#${popoverId}`);

    if (popover) popover.remove();
  }, [disabled, popoverId]);

  useEffect(() => {
    window.removeEventListener('scroll', removeMsg);
    window.addEventListener('scroll', removeMsg);

    return () => {
      window.removeEventListener('scroll', removeMsg);
      removeMsg();
    };
  }, []);

  return (
    <Root ref={popoverEl} className={className} onMouseEnter={appendMsg} onMouseLeave={removeMsg}>
      {children}
    </Root>
  );
};

export default Popover;
