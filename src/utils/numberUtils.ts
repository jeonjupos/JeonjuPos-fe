/**
 * 천단위 콤마 삽입
 */
export const commaDecimal = (value : number | null) : string => {
  if (value === null || Number.isNaN(value)) return '';
  return (value ?? 0).toLocaleString().replace(/\.0+$/, '');
};

/**
 * 소수 몇번째 짜리까지 표현
 */
export const fixedRound = (value: number, places: number) : number => {
  const multiplier = 10 ** places;
  return Math.round(value * multiplier) / multiplier;
};

/**
 * 자릿수 만큼 앞에 0 채우기
 */
export const fillZero = (width: number, str: number | string) : string => {
  str = String(str);
  return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
};

/**
 * start 부터 end 까지 count 애니메이션 처리
 */

export const countAni = (start: number, end: number, callback: ({ start, end }: { start: number, end: number }) => void) => {
  const values = { start, end };
  const countInterval = setInterval(() => {
    if (values.start === values.end) clearInterval(countInterval);
    else values.start += 1;
    if (callback) callback(values);
  }, 1000 / (values.end - values.start));
  return countInterval;
};

/**
 * @description 숫자를 받아서 해당 digit 만큼 number 를 만들어 준다.
 * @example (1, 3) -> '001'
 */
export const makeDigitStrNum = (number: number | string, digit: number) : string => {
  let answer = `${number}`;
  const count = digit - answer.length;
  for (let i = 0; i < count; i += 1) answer = `0${answer}`;
  return answer;
};
