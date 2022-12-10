import React, { forwardRef, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Portal from '@/views/components/common/Portal';
import useClickOutSide from '@/hooks/useClickOutSide';
import DropBoxWrap from '@/views/components/common/input/select/DropBoxWrap';
import {ReactComponent as SvgIcoArrowDown} from '@imgs/icon/ico-arrow-down.svg';

export type SelectData = { label: React.ReactNode | string; value: string | number | null };

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children: React.ReactNode;
  label?: string;
  value?: any;
  name?: string;
  edit?: boolean;
  custom?: boolean;
  dropstyle?: string;
  change?: (value: any, name: any) => void;
  enter?: (value: any, name?: any) => void;
}

const DEFAULT_VALUE = { label: undefined, value: '' };

const JwSelectComp = forwardRef<HTMLInputElement, PropsType>((props, ref: React.ForwardedRef<HTMLInputElement | null>) => {
  const { className, children, label, value = '', name = 'select', dropstyle, disabled = false, edit = false, custom = false, placeholder, change } = props;
  const inputProps = { ...props, children: undefined, className: undefined, change: undefined, enter: undefined, edit: undefined, custom: undefined, dropstyle: undefined };

  const inp = useRef<HTMLInputElement | null>(null);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const dropBoxRef = useRef<HTMLDivElement | null>(null);

  const { open, setOpen, toggleStatus } = useClickOutSide(selectBoxRef);

  const [selected, setSelected] = useState<SelectData>(DEFAULT_VALUE);
  const [text, setText] = useState<string>('');
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const clickSelectBox = () => {
    if (disabled) return;
    if (focus) setOpen(true);
    else toggleStatus();
  };

  const handleEnter = useCallback(() => {
    const { change } = props;

    if (!change) return;

    const { value = '', name } = inputEl || {};
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const findValue = optionList.find(option => option.props.children === value)?.props?.value;
    if (findValue) setSelected({ label: value, value: findValue });
    change(findValue, name);
  }, [inputEl, props]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  }, [handleEnter]);

  const handleChange = useCallback(({ label, value: newVal }: SelectData) => {
    if (disabled) return;
    const { name } = inputEl || {};

    setSelected({ label, value: newVal });

    change && change(newVal, name);
  }, [disabled, change, inputEl]);

  const directEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }, [setText]);

  const optionList = useMemo(() => {
    if (custom) return [];
    const childList = Array.isArray(children) ? children : [children];
    return childList.filter(child => child.type.displayName === 'JwOption').map(child => ({
      ...child,
      props: { ...child.props, selectedValue: selected.value, searchText: text, handleChange },
    }));
  }, [children, text, handleChange, selected, custom]);

  useEffect(() => {
    setInputEl(ref ? (ref as MutableRefObject<HTMLInputElement>).current : (inp as MutableRefObject<HTMLInputElement>).current);
  }, [inp, ref]);

  useEffect(() => {
    const isNotValid = Boolean(selected.value && !selected.label);
    if (typeof value !== 'undefined' && (isNotValid || selected.value !== value)) {
      if (custom) {
        setSelected({ label: value, value });
      } else {
        let label = optionList.find(option => option.props.value === value)?.props.children;
        while (label && typeof label !== 'string') {
          label = label.props.children;
        }

        setSelected({ label, value });
      }
    }
  }, [optionList, value, selected]);

  useEffect(() => {
    setText(selected.label as string);
  }, [selected, open]);

  useEffect(() => {
    if (!selected.label && !value && !placeholder) {
      const firstOption = optionList[0]?.props ?? DEFAULT_VALUE;
      setSelected({
        label: firstOption.children || '-',
        value: firstOption.value,
      });
    }
  }, [optionList, placeholder]);

  return (
    <div className={`${className} ${open ? 'open' : ''} ${disabled ? 'disabled' : ''} ${label ? 'label' : ''} ${edit ? 'edit' : ''}`}>
      <span ref={selectBoxRef} tabIndex={-1} role="button" onClick={clickSelectBox}>
        <label>
          {Boolean(label) && <span className="label">{label}</span>}
          {Boolean(label) || !edit ? <span className="value">{selected.label || placeholder}</span> : ''}
          <input ref={ref || inp} {...inputProps} type="text" name={name} value={text || ''} readOnly={!edit} placeholder={placeholder} autoComplete="off" onInput={directEditChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onKeyDown={handleKeyPress} />
          <SvgIcoArrowDown className="ico-arrow-down" />
        </label>
      </span>

      {open && (
        <Portal selector="#drop-box">
          <DropBoxWrap ref={dropBoxRef} className={`${custom ? '' : 'option-box'}`} customStyle={dropstyle} inputEl={inputEl as HTMLInputElement} parentEl={selectBoxRef.current as HTMLSpanElement} setClose={() => setOpen(false)} searchText={text} onClick={() => !custom && toggleStatus()}>
            {custom ? children : optionList}
          </DropBoxWrap>
        </Portal>
      )}
    </div>
  );
});

// noinspection LessResolvedByNameOnly
const JwSelect = styled(JwSelectComp)`
  .ib; .vam; .wh(auto, 50); .bgc(#FFF); .-a(@grayScale[@e6]); .br(12); .crop; transition: border 0.1s;
  &.disabled{ .o(0.5);
    > span { cursor: not-allowed; }
  }
  > span { .rel; .z(1); .flex; .items-center; user-select: none; .pointer;
    &::before { .cnt; .abs; .lt(0); .z(1); .wh(100%); }
    * { .pointer; }
  }
  > span, label { .rel; .wh( 100%); }
  label { .flex; .flex-column; .justify-center; .items-start; .row-gap(4); .pr(34); .pl(20);
    > span { .block; .min-w(50); box-sizing: border-box; }
  }
  input { .hide; .wh(100%); .fs(14); .-a !important; outline: none; .-box; }
  .value { .fs(14); .c(black); }
  .label { .block; .fs(12); .c(black); .bold;
    ~ .value { .block; .h(14); .c(@grayScale[@55]); }
  }
  .ico-arrow-down { .abs; .z(1); .rt(12, 50%); .w(13); .t-yc; .vab; transition: transform 0.1s; pointer-events: none; }

  &.open { .-a(@indigoNatural[@300]);
    .ico-arrow-down { transform: rotate(-180deg) translateY(50%); }
  }
  &.label{
    label { .pr(50); }
    .ico-arrow-down { .rt(20, 50%); .w(18); }
  }
  &.edit{
    > span { 
      &::before { .hide; }
    }
    input { .block; }
  }
`;

// noinspection LessResolvedByNameOnly
export const SearchSelect = styled(JwSelect)`
  label{ .px(20); .pl(34); .no-repeat('@{icon}/ico-gray-search.svg'); .bg-yc; .bg-x(16); }
  .ico-arrow-down{ .hide; }
`;

export default JwSelect;
