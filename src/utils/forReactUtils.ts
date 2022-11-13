type MakeClassParamsArgs = ((string | undefined) | { [key: string]: any })[] | { [key: string]: any };

export const makeClass = (args: MakeClassParamsArgs) => {
  if (!Array.isArray(args)) {
    return Object.keys(args).reduce((acc, cur) => {
      const isTrue = Boolean(args[cur]);
      return `${acc}${isTrue ? ` ${cur}` : ''}`;
    }, '');
  }

  const onlyStr = (args.filter(arg => typeof arg === 'string') as string[]).reduce((acc, cur) => `${acc} ${cur}`, '');
  const onlyObj = (args.filter(arg => typeof arg === 'object') as { [key: string]: any }[]).reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const objToString = Object.keys(onlyObj).reduce((acc, cur) => `${acc}${onlyObj[cur] ? ` ${cur}` : ''}`, '');

  return `${onlyStr} ${objToString}`.replace(/ {2}/gi, ' ');
};

export const propsDivider = <T, U extends keyof T>(props: T, undefinedList: U[]) => {
  const convertProps = undefinedList.reduce((obj, key) => ({ ...obj, [key]: undefined }), { ...props }) as Omit<T, U>;

  return { originProps: props, convertProps };
};
