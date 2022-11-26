import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { isPassed, remainDayHms } from '@/utils/timeUtils';

interface PropsType {
  className?: string;
  endDateTime: number;
}

const RemainTimeViewComp = ({ className, endDateTime }: PropsType) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [text, setText] = useState('');

  const getRemainTimeText = useCallback(() => {
    const { day, h = '', m = '' } = remainDayHms(endDateTime) || {};
    let dateString = '';

    if (day) dateString += `${day}일 `;
    if (h) dateString += `${h.replace('0', '')}시간 `;
    if (m) dateString += `${m.replace('0', '')}분 `;

    setText(isPassed(endDateTime) ? '' : dateString);
  }, []);

  useEffect(() => {
    if (intervalId !== null) clearInterval(intervalId);
    const id = setInterval(getRemainTimeText, 1000);
    setIntervalId(id);

    return () => {
      setIntervalId(id);
    };
  }, []);
  return (
    <div className={className}>
      <em>{text}</em>
      <span style={{ paddingLeft: '4px' }}>남음</span>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const RemainTimeView = styled(RemainTimeViewComp)`
  > * { .ib; .vam; }
`;

export default RemainTimeView;
