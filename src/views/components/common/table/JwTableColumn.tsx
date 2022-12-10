import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { makeClass } from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
  label: string;
  children?: ReactNode | string;
  filedId?: string;
  colSpan?: number;
  expendControl?: boolean;
  expendOpen?: boolean;
  expendOpenToggle?: () => void;
  beforeExpendOpen?: () => void;
}

const JwTableColumnComp = ({ className, label, children, filedId, colSpan, expendOpen, expendControl = false, expendOpenToggle, beforeExpendOpen }: PropsType) => {
  const handleExpendToggle = async () => {
    if (!expendControl) return;
    try {
      if (beforeExpendOpen && !expendOpen) await beforeExpendOpen();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        expendOpenToggle && expendOpenToggle();
      }, 10);
    }
  };

  return (
    <td className={makeClass([className, filedId, { 'expend-controller': expendControl, 'expend-open': expendControl && expendOpen }])} data-filed-id={filedId} colSpan={colSpan} onClick={handleExpendToggle}>
      {children || ' '}
    </td>
  );
};

// noinspection LessResolvedByNameOnly
const JwTableColumn = styled(JwTableColumnComp)`
    // style
`;

export default JwTableColumn;
