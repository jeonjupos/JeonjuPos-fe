import React, { useState, useMemo, useRef, forwardRef, MutableRefObject, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import BasicResetClose from '@/public/imgs/icon/ico-circle-cancel.svg';
import SvgIcoSearch from '@/public/imgs/icon/ico-search.svg';
import { makeClass, propsDivider } from '@/utils/forReactUtils';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  nospecial?: boolean;
  nospace?: boolean;
  number?: boolean;
  regex?: RegExp;
  before?: string;
  after?: string;
  error?: string;
  checked?: boolean;
  change?: (value: any, name?: any) => void;
  input?: (value: any, name?: any) => void;
  enter?: (value: any, name?: any) => void;
}

const TextInputComp = forwardRef<HTMLInputElement, PropsType>((props, ref: React.ForwardedRef<HTMLInputElement | null>) => {
  const { className, value, type = 'text', before, after, regex, error, readOnly, disabled, change } = props;
  const { convertProps: inputProps } = propsDivider(props, ['className', 'change', 'enter', 'nospecial', 'nospace', 'before', 'after', 'regex', 'error', 'number']);
  const inp = useRef<HTMLInputElement | null>(null);

  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const [text, setText] = useState(value ?? '');
  const [focus, setFocus] = useState(false);

  const resetIconActive = useMemo(() => type === 'search' && focus && Boolean(text), [text, focus, type]);

  const handleEnter = useCallback(() => {
    const { enter } = props;

    if (!enter) return;

    const { value = '', name } = inputEl || {};
    if (enter) {
      enter(value, name);
    }
  }, [inputEl, props]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>, status: boolean) => {
    const { onFocus, onBlur } = props;

    setFocus(status);

    if (status) onFocus && onFocus(e);
    else {
      onBlur && onBlur(e);
    }
  }, [props, text]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  }, [handleEnter]);

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    const { name } = e.target;

    const { max = 999999999999999, maxLength, number, nospecial, nospace, change, onChange } = props;

    if (number) {
      if (max && Number(value) > Number(max)) value = String(max);
      if (!/^[+-]?\d*(\.?\d*)$/.test(value)) value = text.toString();
      if (value.length > 1) value = value.replace(/(^0+)/, '');
    }
    if (maxLength && value.length > maxLength) value = value.substring(0, maxLength);
    if (nospecial) value = value.replace(/[{}[\]/?.,;:|)*~`!^\-+<>@#$%&\\=('"]/gi, '');
    if (nospace) value = value.replace(/ /g, '');
    if (regex) value = value.replace(regex, '');

    e.target.value = value;

    const putVal = number && Boolean(value) ? Number(value) : value || '';

    if (value !== text) setText(putVal);

    change && change(putVal, name);
    onChange && onChange(e);
  }, [props, text, type]);

  const handleReset = useCallback(() => {
    if (inputEl) {
      inputEl.value = '';
      const { name } = inputEl;
      change && change('', name);
      setText('');
    }
  }, [inputEl, change]);

  useEffect(() => {
    setInputEl(ref ? (ref as MutableRefObject<HTMLInputElement>).current : (inp as MutableRefObject<HTMLInputElement>).current);
  }, [inp, ref]);

  useEffect(() => {
    if (value !== text) {
      setText(value ?? '');
    }
  }, [value]);

  return (
    <span className={makeClass([className, { focus, readonly: readOnly, disabled, error: Boolean(error) }])}>
      <div className="inp-cont">
        {Boolean(before || after) && <span className="text before">{before}</span>}
        {type === 'search' && (
          <div className={makeClass(['search-cont', { reset: resetIconActive }])}>
            {resetIconActive && <BasicResetClose className="ico-reset" onMouseDown={handleReset} />}
            <SvgIcoSearch className="ico-search" onMouseDown={handleEnter} />
          </div>
        )}
        <input ref={ref || inp} {...inputProps} className={makeClass({ 'before-after': before || after, after })} value={text} aria-autocomplete="none" inputMode={props.number ? 'numeric' : props.inputMode} onChange={handleValueChange} onFocus={e => handleFocus(e, true)} onBlur={e => handleFocus(e, false)} onKeyDown={handleKeyPress} />
        {Boolean(before || after) && <span className="text after">{after}</span>}
      </div>
    </span>
  );
});

// noinspection LessResolvedByNameOnly
export const TextInput = styled(TextInputComp)`
  .h(54); .bgc(white); .-a(@grayScale[@f0]); .br(12); .crop;
  .inp-cont{ .rel; .flex; .items-center; .wh(100%);
    .text{ .fs(14, 17); white-space: nowrap;
      &.before{ .pl(20); }
      &.after{ .pr(20); 
      }
    }
    .search-cont{ .abs; .rt(24,50%); .z(3); .t-yc; .pointer;
      svg { .mr(4);
        &:last-child{ .mr(0); }
      }
      .ico-search { .wh(16); .vab;
        path { fill: @indigoNatural[@150]; }
      }
      .ico-reset{ .wh(24); }
      ~ input { .pr(54); }

      &.reset{
        .ico-search { .vam; }
        ~ input { .pr(70); }
      }
    }
  }
  
  input { .rel; .z(1); .wf; .h(inherit); .p(0, 20); .fs(14); .c(black); .-a; .bgc(transparent); outline: none; box-sizing: border-box; appearance: none;
    &::placeholder { .c(@grayScale[@80]); }
    &::-ms-clear, &::-ms-reveal { .hide; .wh(0); }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration { .hide; }
    &::-webkit-inner-spin-button { appearance: none; }
    &.before-after{ .p(0,8);
      &.after{ .tr; }
    }
  }
  
  &.readonly{  .-a(@grayScale[@e6]); 
    input{ .c(@grayScale[@80]); }
  }

  &.disabled{ .o(0.5);
  input { cursor: not-allowed;  }
  }
  &.error{ .-a(@redNatural[@500]) !important; }
  
  @media(@wg-mobile){
    .inp-cont{
      .search-cont{ .rt(20,50%);
        ~ input { .pr(50); }
        &.reset{
          ~ input { .pr(50); }
        }
      }
    }
  }
`;

export default TextInput;
