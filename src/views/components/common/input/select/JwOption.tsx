import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SelectData } from './JwSelect';

interface PropsType {
  className?: string;
  value: string | number | null;
  children: React.ReactNode | string;
  selectedValue?: string;
  searchText?: string;
  handleChange?: (selectData: SelectData) => void;
}

const JwOptionComp = ({ className, value, children, selectedValue = '', searchText = '', handleChange }: PropsType) => {
  const isMatch = useMemo(() => typeof children === 'string' && children.includes(searchText), [children, searchText]);
  const handleSelectValue = useCallback(() => {
    handleChange && handleChange({ label: children, value });
  }, [children, handleChange, value]);

  return (
    <div className={`${className} ${selectedValue === value ? 'active' : ''} ${isMatch ? 'match' : ''}`} role="button" tabIndex={-1} onClick={handleSelectValue}>
      {children}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const JwOption = styled(JwOptionComp)`
  .p(10,12); .fs(14); .pointer;

  &.active{ .c(@indigoNatural[@300]); .bold; .bgc(white); }
  &:hover { .bgc(@grayScale[@f5]); }
  
  &.match{
    &:nth-of-type(1) { .bgc(@grayScale[@f5]); }
  }
`;

export default JwOption;
