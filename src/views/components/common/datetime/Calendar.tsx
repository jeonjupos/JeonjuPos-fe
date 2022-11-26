import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import dayjs, { ManipulateType } from 'dayjs';
import SvgIconCalendarArrow from '@/public/imgs/icon/ico-calendar-arrow.svg';
import { makeClass } from '@/utils/forReactUtils';

type WeekDateType = { dto: Date; t: number; m: any; ymd: number; ext: any; out: any; };

interface PropsType {
  className?: string;
  hideExt?: boolean;
  name?: string;
  markingDates?: string[];
  range?: boolean;
  startMonth?: string;
  rangeStart?: number;
  rangeEnd?: number;
  value?: null | number | (number | null)[];
  change?: (value:any, name: any) => void;
}

const CalendarComp = ({
  className,
  hideExt = false,
  name,
  markingDates = [],
  range = false,
  startMonth = dayjs().format('YYYY-MM'),
  rangeStart = 0,
  rangeEnd = 999999999999999,
  value,
  change,
}: PropsType) => {
  const today = +dayjs().format('YYYYMMDD');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const [data, setData] = useState<(number | null)[] | number | null>(range ? [null, null] : null);
  const [row, setRow] = useState<number[]>([]);
  const [month, setMonth] = useState(startMonth);
  const [startDay, setStartDay] = useState(0);
  const [arg, setArg] = useState(month.match(/^(\d{4})-(\d{2})$/) as string[]);

  const realValue = useMemo(() => (typeof value === 'undefined' ? data : value), [value, data]);
  const convertMarkingDates = useMemo(() => markingDates.map(date => +dayjs(date).format('YYYYMMDD')), [markingDates]);

  const parseDate = (timestamp: string | number | null) => {
    if (!timestamp) return 0;

    const matched = String(timestamp).match(/^([+-]?\d+)\s+(day|month|week|year)$/);
    const m = matched ? dayjs().add(+matched[1], matched[2] as ManipulateType) : dayjs(timestamp);

    return +m.format('YYYYMMDD');
  };

  const selectYmd = useMemo(() => (range ? '' : parseDate(realValue as number)), [realValue]);
  const rangeSelectYmd = useMemo(() => {
    const [start, end] = realValue as (number | null)[];
    const startDate = start ? parseDate(start) : 0;
    const endDate = end ? parseDate(end) : 0;
    return [startDate, endDate];
  }, [range, realValue]);

  const getBaseDTO = () => {
    // console.log(arg);
    return new Date(Number(arg[1]), Number(arg[2]) - 1, 1);
  };

  const getDTO = (r: number, c: number) => {
    const dto = getBaseDTO();
    dto.setDate((((r - 1) * 7) + c + 1) - startDay);
    return dto;
  };

  const dateData = (r: number, c: number) : WeekDateType => {
    const dto = getDTO(r, c);
    const t = dto.getTime() ?? 0;
    const m = dayjs(dto);
    const ymd = +m.format('YYYYMMDD');
    const ext = month !== m.format('YYYY-MM');
    const out = (rangeStart && parseDate(rangeStart) > ymd) || (rangeEnd && parseDate(rangeEnd) < ymd);
    return { dto, t, m, ymd, ext, out };
  };

  const weekData = (r: number) => [...Array(7)].map((_, c) => dateData(r, c));

  const applyMonth = () => {
    const newArg = String(month).match(/^(\d{4})-(\d{2})$/);
    if (!newArg) throw new Error('invalid month format (YYYY-MM)');
    const dto = getBaseDTO();
    const startDay = dto.getDay();
    dto.setMonth(dto.getMonth() + 1);
    dto.setDate(0);
    const lastDate = dto.getDate();
    const rowCnt = Math.ceil((startDay + lastDate) / 7);

    setArg(newArg);
    setStartDay(startDay);
    if (newArg[0] !== arg[0] || row.length === 0) setRow(Array.from({ length: rowCnt }).map((_, index) => index + 1));
  };

  const selectDate = (d: WeekDateType) => {
    if (d.out) return;
    if (hideExt && d.ext) return;

    if (typeof value === 'undefined') setData(d.m.format('YYYY-MM-DD'));
    change && change(d.m.format('YYYY-MM-DD'), name);
  };

  const selectRange = (d: WeekDateType) => {
    if (d.out) return;
    if (hideExt && d.ext) return;

    let selectedRange = [...realValue as (number | null)[]];

    if (!selectedRange[0]) selectedRange[0] = d.t;
    else if (!selectedRange[1]) {
      const startTime = new Date(selectedRange[0]);
      selectedRange[Number(startTime) < d.t ? 1 : 0] = d.t;
    } else if (selectedRange[1]) selectedRange = [d.t, null];

    if (typeof value === 'undefined') setData(selectedRange);
    change && change(selectedRange, name);
  };

  const monthDecrease = () => {
    const newMonth = dayjs(month).subtract(1, 'month').format('YYYY-MM');
    setMonth(newMonth);
  };

  const monthIncrease = () => {
    const newMonth = dayjs(month).add(1, 'month').format('YYYY-MM');
    setMonth(newMonth);
  };

  useEffect(() => {
    applyMonth();
  }, [month, row]);

  return (
    <div className={className}>
      <div className="month-control">
        <button className="btn-prev" onClick={monthDecrease}>
          <SvgIconCalendarArrow />
        </button>
        <span className="month">{dayjs(month).format('YYYY.MM')}</span>
        <button className="btn-next" onClick={monthIncrease}>
          <SvgIconCalendarArrow />
        </button>
      </div>
      <div className="table-cont">
        <table>
          <thead>
            <tr>
              {weekDays.map(day => <td key={day}>{day}</td>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="spacer" />
            </tr>
            {row.map(r => (
              <tr key={`${r}-${month}`}>
                {weekData(r).map(d => (
                  <td
                    key={`${month}-day-${d.ymd}`}
                    className={makeClass({ past: today > d.ymd, selected: selectYmd === d.ymd, start: rangeSelectYmd[0] === d.ymd, end: rangeSelectYmd[1] === d.ymd, in: rangeSelectYmd[0] <= d.ymd && rangeSelectYmd[1] >= d.ymd, ext: d.ext, out: d.out, marking: convertMarkingDates.includes(d.ymd) })}
                    onClick={() => (range ? selectRange(d) : selectDate(d))}
                  >
                    {!hideExt || d.ext ? (
                      <div className="date-box">
                        <span>{d.dto.getDate()}</span>
                      </div>
                    ) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const Calendar = styled(CalendarComp)`
  .wf; .-a(@grayScale[@e6]); .br(12); .crop;
  .month-control { .flex; .space-between; .items-center;
    > button { .wh(40); transform: rotate(0deg) translateY(-1px); .pointer; }
    .btn-next { transform: rotate(180deg) translateY(-2px); }
    .month{ .fs(14); .c(@indigoNatural[@150]); .bold; }
  }
  .table-cont { .rel; .p(0, 16, 14); 
    &::before{ .cnt; .abs; .lt(0); .z(1); .wh(100%, 28); .bgc(@grayScale[@f5]); }
  }
  table { .rel; .z(2); .w(100%); border-collapse: collapse; border-spacing: 0;
    td{ .vam; }
    thead {
      td { .h(28); .fs(12); .c(@grayScale[@55]); }
    }
    tbody { .min-h(200);
      .spacer { .pt(6); .h(0); }
      td { .pointer;.rel;  .py(2); .fs(12); .-box;
        .date-box{ .rel;
          span { .rel; .z(2); .flex; .justify-center; .items-center; .wh(26); .tc; .c(black); }
        }
        
        &:first-child{
          .date-box{
            &::after{ border-top-left-radius: 50%; border-bottom-left-radius: 50%; }
          }
        }

        &:last-child{
          .date-box{
            &::after{ border-top-right-radius: 50%; border-bottom-right-radius: 50%; }
          }
        }

        &.selected { .rel;
          .date-box{ .rel;
            &:before {.cnt; z-index: 2; .abs; .wh(100%); .bgc(@indigoNatural[@500]); .br(50%); .lt(50%, 50%); .t-xyc; }
            span { .rel; .c(white); .bold; }
          }
        }
        .selected-label { .abs; .t(-10); .l(0); .r(0); .c(#2C81FF); .fs(12); .z(1); }
        &.start { .rel;
          .date-box{
            &:before {.cnt; z-index: 2; .abs; .wh(100%); .bgc(@indigoNatural[@500]); .br(50%); .lt(50%, 50%); .t-xyc; }
            &::after{ border-top-left-radius: 50%; border-bottom-left-radius: 50%; }
            span { .rel; .c(white); .bold; }
          }
        }
        &.end { .rel;
          .date-box{
            &:before {.cnt; z-index: 2; .abs; .wh(100%); .bgc(@indigoNatural[@500]); .br(50%); .lt(50%, 50%); .t-xyc; }
            &::after{ border-top-right-radius: 50%; border-bottom-right-radius: 50%; }
            span { .rel; .c(white); .bold; }
          }
        }
        &.in { 
          .date-box{ .rel;
              &::after{ .cnt; .abs; .lt(0); .wh(100%); .bgc(@blueNatural[@50]); }
          }
        }
        &.emphasis:not(.selected) {
          &:before {.cnt; z-index: 0; .abs; .wh(32); .bgc(rgba(0, 0, 0, 0.2)); .br(16); .lt(50%, 50%); .t-xyc;}
        }
        &.marking:not(.ext) {
          &::after{ .cnt; .abs; .lb(50%,2); .z(3); .wh(2); .mh-c; .bgc(#fff); .t-xyc; border-radius:50%; }
        }
        &.out { cursor: default;
          span { .o(.4); }
        }
        &.ext { .bgc(#FFF);
          span { .c(@grayScale[@80]); }
        }
      }
    }
    td {.tc;}
  }
`;

export default Calendar;
