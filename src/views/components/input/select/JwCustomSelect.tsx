import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import useClickOutSide from '@/hooks/useClickOutSide';
import SvgIcoArrowDown from '@/public/imgs/icon/ico-arrow-down.svg?component';

interface PropsType {
  className?: string;
  children?: React.ReactNode | string;
  label: string;
  value?: string;
  placeholder: string;
}

const JwCustomSelectComp = ({ className, children, label, value, placeholder }: PropsType) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(0);
  const { open, setOpen, toggleStatus } = useClickOutSide(ref);

  const childrenList = useMemo(() => {
    const childList = Array.isArray(children) ? children : [children];
    return childList.map(child => ({
      ...child,
      props: { ...child.props, close: () => setOpen(false) },
    }));
  }, [children, setOpen]);

  const handleClick = useCallback(() => {
    if (ref.current) {
      setHeight((ref.current.clientHeight || 0) + 10);
    }
    toggleStatus();
  }, [ref, setHeight, toggleStatus]);

  useEffect(() => {

  }, []);

  return (
    <div ref={ref} className={className}>
      <div role="button" tabIndex={-1} className={`custom-select ${open ? 'open' : ''}`} onClick={handleClick}>
        <span className="label">{label}</span>
        <span className={`value ${placeholder ? 'placeholder' : ''}`}>{value || placeholder}</span>
        <SvgIcoArrowDown className="ico-arrow-down" />
      </div>
      {open && <div className="drop-box" style={{ top: `${height}px` }}>{childrenList}</div>}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const JwCustomSelect = styled(JwCustomSelectComp)`
  .rel;
  .custom-select{ .rel; .flex; .flex-column; .p(20); .pr(40); .br(12); .-a(@grayScale[@f0], 2); .bgc(white); .pointer;
    .label{ .mb(4); .fs(12); .bold; .c(black); }
    .value { .fs(14); .c(@grayScale[@55]); }
    .ico-arrow-down { .abs; .z(1); .rt(12, 50%); .w(13); .t-yc; .vab; transition: transform 0.1s; pointer-events: none; }
    &.open { .-a(@indigoNatural[@300], 2);
      .ico-arrow-down { transform: rotate(-180deg) translateY(50%); }
    }
  }
  .drop-box{ .abs; .lt(0,0); .z(1); .wf; }
`;

export default JwCustomSelect;
