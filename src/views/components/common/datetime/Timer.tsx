import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { remainDayHms } from '@/utils/timeUtils';

interface PropsType {
  className?: string;
  endDateTime: number;
}

const TimerComp = ({ className, endDateTime }: PropsType) => {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const id:NodeJS.Timer = setInterval(() => {
      const { hms = '00:00:00' } = remainDayHms(endDateTime, true) || {};
      setTime(`${hms}`);
    }, 1000);

    return () => {
      clearInterval(id as NodeJS.Timer);
    };
  }, [endDateTime]);

  // useEffect(() => {
  //   return () => {
  //     clearInterval(intervalId );
  //   };
  // }, [intervalId]);
  return (
    <span className={className}>
      {time}
    </span>
  );
};

// noinspection LessResolvedByNameOnly
const Timer = styled(TimerComp)`

`;

export default Timer;
