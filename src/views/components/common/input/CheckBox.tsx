import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _uniqueId from 'lodash/uniqueId';
import Ripple, { RippleOption } from '@components/common/Ripple';
import SvgIcoCheck from '@/public/imgs/icon/ico-check.svg';
import { propsDivider } from '@/utils/forReactUtils';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode | string;
  data?: any;
  type?: 'checkbox' | 'radio';
  label?: string;
  name?: string;
  value?: any;
  className?: string;
  ripple?: RippleOption;
  change?: (value: any, name?: string) => void;
}

const CheckBoxComp = (props: PropsType) => {
  const { data, value, children, type = 'checkbox', name, label, className, disabled = false, ripple, change } = props;
  const { convertProps: inputProps } = propsDivider(props, ['className', 'ripple', 'data', 'label', 'children', 'change']);

  const [uniqueId] = useState(`${type}-${_uniqueId()}`);
  const [check, setCheck] = useState(false);
  const inpRef = useRef<HTMLInputElement>(null);

  const handleCheck = (changeData: any) => {
    if (!inpRef.current) return;

    setCheck(inpRef.current.checked);
    if (Array.isArray(changeData)) {
      inpRef.current.checked = changeData.includes(value);
      setCheck(changeData.includes(value));
    } else if (typeof changeData === 'boolean') {
      inpRef.current.checked = changeData;
      setCheck(changeData);
    } else if (data === value) {
      inpRef.current.checked = true;
      setCheck(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { name: elName } = e.target;
    let changeValue: any = false;
    if (type === 'checkbox') {
      changeValue = [];
      const query = `input[name="${elName}"]:checked`;
      const selectedEls = document.querySelectorAll(
        query,
      ) as unknown as HTMLInputElement[];

      for (let i = 0; i < selectedEls.length; i += 1) {
        const tempVal = typeof value === 'number'
          ? Number(selectedEls[i].value)
          : selectedEls[i].value;
        const indexOf = changeValue.findIndex((val: unknown) => val === tempVal);
        if (indexOf === -1) changeValue.push(tempVal);
      }

      if (data) data.push(value);

      changeValue = data ? data.filter((d: any) => changeValue.includes(d)) : [...new Set(changeValue)];
    } else {
      const { checked } = e.target;

      if (checked) {
        if (value) changeValue = value;
        else changeValue = true;
      }
    }

    change && change(changeValue, elName);
  };

  useEffect(() => {
    if (data) {
      if (type === 'checkbox') {
        const uniqData = [...new Set(data)];
        if (JSON.stringify(uniqData) !== JSON.stringify(data)) {
          change && change(uniqData, name);
        }
        handleCheck(uniqData);
      } else {
        handleCheck(data);
      }
    } else if (typeof data !== 'undefined') {
      if (inpRef.current && data !== value) {
        inpRef.current.checked = false;
      }
    }
  }, [data]);

  return (
    <Ripple {...ripple}>
      <label
        htmlFor={uniqueId}
        className={`${className} ${check ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <input
          ref={inpRef}
          id={uniqueId}
          type={type}
          {...inputProps}
          name={name || uniqueId}
          onChange={handleChange}
        />
        <span className="inp">
          <span className={`chk ${!label && !children ? 'standalone' : ''}`}>
            {type === 'checkbox' ? <SvgIcoCheck /> : <i />}
          </span>
          {Boolean(label || children) && <span className="text">{label || children}</span>}
        </span>
      </label>
    </Ripple>
  );
};

// noinspection LessResolvedByNameOnly
export const CheckBox = styled(CheckBoxComp)`
  .ib; .vam; .pointer; user-drag: none; user-select:none;
    input { .hide;
      &[type=radio] {
        &:checked {
          ~ .inp { .semi-bold;
            .chk { .bgc(@indigoVivid[@500]); .-a(@indigoVivid[@500], 1); transition: all 0.2s;
              > i {.bgc(white); transition: all 0.2s; }
            }
            .text { }
          }
        }

        ~ .inp { .flex; .items-center;
          > * { .ib; .vam; }
          .chk { .rel; .flex-center; .wh(16); .mr(8); .bgc(white); .-a(@indigoGrey[@80], 1); .br(50%);
            &.standalone { .mr(0); }
            > i { .wh(6); .bgc(@indigoGrey[@80]); border-radius: 50%;  }
          }
        }
      }

      &[type=checkbox] {
        &:checked {
          ~ .inp {
            .chk { .-a(@indigoNatural[@300], 1); .bgc(@indigoNatural[@300]);
              svg { animation: checkBounce 0.1s;
                path { fill: #fff; }
              }
            }

            .text { .semi-bold; }
          }
        }

        ~ .inp { .flex; .items-center;
          > * { .ib; .vam; }
          .chk { .rel; .flex-center; .inline-flex; .wh(16); .mr(8); .-a(@indigoNatural[@80], 1); transition: all 0.2s;
            &.standalone { .mr(0); }
            svg {
              path { fill: @indigoNatural[@80]; }
            }
          }
          .text { .fs(12); }
        }
      }
    }
  
`;

// noinspection LessResolvedByNameOnly
export const ButtonCheckBox = styled(CheckBox)`
  .flex-center; .bgc(white); .crop; user-drag: none;
  &.checked{ .c(@indigoNatural[@300]); .-a(@indigoNatural[@300], 2);
    .inp{
      .text{  }
    }
  }
  input{ .hide;
    &:checked{
      ~ label { .c(@indigoNatural[@300]); .-a(@indigoNatural[@300], 2); }
    }
  }
  
  .inp{ .c(inherit);
    .chk{ .hide !important; .c(inherit); }
  }

  &.disabled{ .o(0.5); cursor: not-allowed; }
`;

export default CheckBox;
