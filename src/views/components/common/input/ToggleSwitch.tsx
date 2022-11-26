import React from 'react';
import styled from 'styled-components';
import { makeClass } from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
  onChange?: (value: boolean, name?: string) => void;
  value: boolean;
  disabled?: boolean;
}

const ToggleSwitchComp = ({ className, value, disabled = false, onChange }: PropsType) => {
  const changeHandler = (e: any) => {
    onChange && onChange(e.target.checked as boolean);
  };

  return (
    <label className={makeClass([className, { checked: value }])}>
      <input
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={changeHandler}
      />
      <span className="on-off" />
    </label>
  );
};

// noinspection LessResolvedByNameOnly
const ToggleSwitch = styled(ToggleSwitchComp)`
  .rel; .ib; .wh(40,20); .bgc(@indigoNatural[@80]); .pointer; box-sizing: border-box; .br(50);
  &.checked { .bgc(@indigoNatural[@300]); }
  input { .o(0); .wh(0); }
  .on-off { .abs; .lt(0,0); .z(1); .w(50%); .-a(transparent); .br(20);  transition: 0.4s; 
    &::before { .cnt; .pb(100%); .bgc(white); .br(20); transition: 0.4s; }
  }
  input:checked + .on-off { .t-x(100%); transition: 0.4s; }
`;

export default ToggleSwitch;
