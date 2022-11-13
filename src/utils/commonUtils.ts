/**
 * 특정 길이만큼 앞에 특정값을 채움
 */
export const pad = (v: string | number, p: string | number, len: number): string => {
  let r = `${v}`;
  if (r.length >= len) return r;
  while (r.length < len) r = p + r;
  return r;
};

/**
 * 첫 글자만 대문자로
 */
export const firstUpperCase = (text: string) => {
  const textLength = text.length;
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1, textLength)}`;
};
