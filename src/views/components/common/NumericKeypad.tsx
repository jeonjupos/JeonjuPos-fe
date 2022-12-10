import React, {useState} from 'react';
import styled from 'styled-components';
import JwButton from '@/views/components/common/button/JwButton';
import {ReactComponent as SvgIcoArrow} from '@imgs/icon/ico-top-arrow.svg';
import {commaDecimal} from '@/utils/numberUtils';

interface PropsType {
    className?: string;
    disabled?: boolean;
    onChangeValue?: (value: number) => void;
}

const NumericKeypadComp = ({className, disabled = false, onChangeValue}: PropsType) => {
  const [value, setValue] = useState(0);

  const handleChangeValue = (e: React.MouseEvent) => {
    const el = e.target as HTMLButtonElement;
    const newVal = Number(`${value}${el.innerText}`);
    setValue(newVal);
  }

  const handleReset = () => {
    setValue(0);
  }

  const handleDelete = () => {
    const newVal = value.toString().slice(0, value.toString().length - 1);
    setValue(Number(newVal));
  }

  const handleChangeSubmit = () => {
    handleReset();
    onChangeValue && onChangeValue(value);
  }


  return (
    <div className={className}>
      <div className="monitor">{commaDecimal(value)}</div>
      <div className="pad-row">
        <JwButton disabled={disabled} onClick={handleChangeValue}>7</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>8</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>9</JwButton>
      </div>
      <div className="pad-row">
        <JwButton disabled={disabled} onClick={handleChangeValue}>4</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>5</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>6</JwButton>
      </div>
      <div className="pad-row">
        <JwButton disabled={disabled} onClick={handleChangeValue}>1</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>2</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>3</JwButton>
      </div>
      <div className="pad-row">
        <JwButton disabled={disabled} onClick={handleChangeValue}>0</JwButton>
        <JwButton disabled={disabled} onClick={handleChangeValue}>00</JwButton>
        <JwButton disabled={disabled} onClick={handleReset}>C</JwButton>
      </div>
      <div className="pad-row">
        <JwButton disabled={disabled} className="btn-delete" onClick={handleDelete}>
          <SvgIcoArrow />
        </JwButton>
        <JwButton disabled={disabled} onClick={handleChangeSubmit}>Enter</JwButton>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const NumericKeypad = styled(NumericKeypadComp)`
  
  .flex; .flex-column; .row-gap(5); .wh(300,400); .py(5);
  >div{ .h(calc(100% / 6)); }
  .pad-row{ .flex; .col-gap(5); .row-gap(5);
    ${JwButton} { .wh(100%); .fs(20); .c(white); .bgc(#333); .br(5); 
      &.btn-delete{ 
        svg { .t-r(-90deg);
          path{ stroke: #fff; }
        }
      }
    }
  }
  .monitor{ .py(20); .px(12); .tr; .fs(32); .c(white); .bgc(rgba(0,0,0,0.6)); .br(5); font-family: 'Digital-7', sans-serif; }
`;

export default NumericKeypad;
