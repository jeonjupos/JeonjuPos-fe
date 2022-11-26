import React, { useCallback, useMemo } from 'react';

export interface RippleOption {
  color?: string;
  duration?: number;
  disabled?: boolean;
}

interface PropsType {
  children: any;
}

export const DEFAULT_RIPPLE_OPTION = {
  color: 'rgb(255,255,255)',
  duration: 200,
  disabled: false,
};

const Ripple = ({
                  color = DEFAULT_RIPPLE_OPTION.color,
                  duration = DEFAULT_RIPPLE_OPTION.duration,
                  disabled = DEFAULT_RIPPLE_OPTION.disabled,
                  children,
                }: PropsType & RippleOption) => {
  const setRippleColor = useCallback((rippleColor: string) => {
    if (rippleColor.includes('#')) {
      /* 맨 앞의 "#" 기호를 삭제하기. */
      const hex = rippleColor.trim().replace('#', '');

      /* rgb로 각각 분리해서 배열에 담기. */
      const rgb = (hex.length === 3 ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi)) as RegExpMatchArray;
      rgb.forEach((str, x, arr) => {
        /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */
        if (str.length === 1) str += str;
        /* 10진수로 변환하기. */
        arr[x] = String(parseInt(str, 16));
      });

      rippleColor = `rgb(${rgb.join(', ')})`;
    }

    return rippleColor;
  }, []);

  const rippleHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let el = event.target as HTMLElement;

    while (!el.classList.contains('ripple-el')) {
      if (el.parentNode) el = el.parentNode as HTMLElement;
    }

    if (!el || disabled) return;

    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    const { clientX, clientY } = event;
    const { left, top } = el.getBoundingClientRect();
    const ripple = document.createElement('bp-ripple');
    const rippleWidth = (el.offsetWidth + el.offsetHeight / 2);
    const rippleColor = setRippleColor(color as string);

    ripple.className = 'animate';
    ripple.setAttribute('style', `
    position: absolute;
    top: ${clientY - top}px;
    left: ${clientX - left}px;
    z-index: 1;
    width: ${rippleWidth}px;
    height: ${rippleWidth}px;
    background-color: ${rippleColor};
    animation: materialRipple ${Math.abs(duration as number)}ms linear;
    border-radius: 50%;
    opacity: 0;
    cursor: pointer;
    pointer-events: none;
    transform-origin: center;
    will-change: transform, opacity;
  `);

    el.prepend(ripple);

    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, Math.abs(duration as number) + 200);
  }, [color, disabled, duration, setRippleColor]);

  const rippleWrapChildren = useMemo(() => {
    return [children].map(child => {
      return ({
        ...child,
        props: { ...child.props, className: `${child.props.className} ripple-el`, onMouseDown: rippleHandler },
      });
    });
  }, [children, rippleHandler]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {rippleWrapChildren[0]}
    </>
  );
};

export default Ripple;
