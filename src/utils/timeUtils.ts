import { pad } from '@/utils/commonUtils';
import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 날짜값 millisecond 값으로 변경
 */
export const getTime = (val?: string) => dayjs(val).toDate().getTime();
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const renderHms = (sec: number, maintainHour: boolean) => {
  let s = Math.floor(sec);
  const h = Math.floor(s / HOUR);
  s -= h * HOUR;
  const m = Math.floor(s / MINUTE);
  s -= m * MINUTE;
  const hh = maintainHour || h > 0 ? `${pad(h, '0', 2)}:` : '';
  return `${hh}${pad(m, '0', 2)}:${pad(s, '0', 2)}`;
};

export const remainDate = (target: number, unitOfTime: QUnitType | OpUnitType = 'day') => {
  const timeDiff = 0;
  const v = dayjs(target).diff(dayjs(+new Date() + timeDiff), unitOfTime);
  if (v < 0) return 0;
  return v;
};

/**
 * 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 */
export const remainHms = (target: number, maintainHour = true): string | null => {
  const v = remainDate(target, 'second');
  if (v < 0) return null;
  return renderHms(v, maintainHour);
};

/**
 * 날짜포함 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 */
export const remainDayHms = (target: number | string, maintainHour = false): { day: number, hms: string, h: string, m: string, s: string, days: number } | null => {
  const now = dayjs(Date.now());
  const then = dayjs(+target);
  let s = then.diff(now, 'second');
  if (s < 0) return null;
  const day = Math.floor(s / DAY);
  s -= day * DAY;
  const hms = renderHms(s, maintainHour);
  const days = Math.floor(then.toDate().getTime() / DAY / 1000) - Math.floor(now.toDate().getTime() / DAY / 1000);
  return { day, days, hms, h: hms.slice(0, 2), m: hms.slice(3, 5), s: hms.slice(6, 8) };
};

/**
 * 이미 지났는지 여부
 */
export const isPassed = (target: string | number): boolean => dayjs(+target).isBefore(dayjs(+new Date()));

/**
 * D-day
 */
export const dday = (dueDate: number | string): string => {
  if (!dueDate) return 'D-?';
  const d = dayjs(+new Date()).diff(dayjs(+dueDate), 'day');
  if (d === 0) return 'D-day';
  return d > 0 ? `D+${d}` : `D${d}`;
};

/**
 * 00:00 ~ hour 까지 시간 목록 배열로 반환
 * D-day
 */
export const hours = (hour: number): string[] => {
  let n = 1;
  const list = [];
  while (hour >= n) {
    list.push(`${n < 10 ? `0${n}` : n}:00`);
    n += 1;
  }
  return list;
};

/**
 * 시작 - 끝 날짜 목록 배열로 반환
 * @param {string} s 'YYYY-MM-DD'
 * @param {string} e 'YYYY-MM-DD'
 */
export const startToLast = (s: string, e: string): string[] | string => {
  // eslint-disable-next-line prefer-regex-literals
  const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  if (!(regex.test(s) && regex.test(e))) return 'date format error';
  const result = [];
  const start = new Date(s);
  while (start <= new Date(e)) {
    result.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }
  return result;
};

export const fullDateDetail = (milliSec: number) => dayjs(milliSec).format('YYYY/MM/DD a h:mm');

export const fullDate = (milliSec: number, secFlag = false) => {
  if (secFlag) return dayjs(milliSec).format('YYYY.MM.DD HH:mm:ss');
  return dayjs(milliSec).format('YYYY.MM.DD HH:mm');
};

export const getYM = (milliSec: number) => dayjs(milliSec).format('YYYY-MM');

export const getYMD = (milliSec: number | string) => dayjs(milliSec).format('YYYY.MM.DD');

export const getHM = (milliSec: number) => dayjs(milliSec).format('HH:mm');

export const getDetailHM = (milliSec: number) => dayjs(milliSec).format('HH:mm:ss.SSS');

export const getEnHM = (milliSec: number) => dayjs(milliSec).locale('en').format('HH:mm:00 A');

export const getShortYMD = (milliSec: number, format = 'YY.MM.DD') => dayjs(milliSec).format(format);

export const customDateFormat = (milliSec: number, format = 'YYYY.MM.DD HH:mm') => dayjs(milliSec).format(format);

export const getPastFromNow = (duration: number) => dayjs().subtract(duration).valueOf();

export const getToday = (format = 'YY.MM.DD') => dayjs().format(format);

export const getFromNow = (milliSec: number, withoutSuffix = false) => dayjs(milliSec).fromNow(withoutSuffix);

export const getNextFromNow = (hour: number, isDaily: boolean) => {
  dayjs.tz.setDefault('Asia/Seoul');
  const nowDate = +dayjs(getToday('YYYY-MM-DD'));
  let dayDiff = dayjs().get('h') < hour ? 0 : 1;
  if (!isDaily) {
    const day = dayjs().get('d');
    // 월요일(day=1) 기준
    dayDiff = (() => {
      switch (true) {
        case day === 0:
          return 1;
        case day === 1:
          return dayjs().get('h') < hour ? 0 : 7;
        case day >= 2:
        default:
          return 8 - day;
      }
    })();
  }

  const targetGap = 1000 * 3600 * (dayDiff * 24 + hour);

  return (nowDate + targetGap) - +dayjs();
};

export const getTimeDiff = (target: string | number) => +dayjs(target).diff(dayjs());

export const tournamentDate = (milliSec?: number) => {
  dayjs.tz.setDefault('Asia/Seoul');
  return milliSec ? dayjs(milliSec).format('MM/DD KST HH:mm') : '';
};
