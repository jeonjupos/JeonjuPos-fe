export const scrollFreeze = () => {
  const body = document.body as HTMLBodyElement;

  body.style.overflowY = 'hidden';
};

export const scrollRelease = () => {
  const body = document.body as HTMLBodyElement;

  body.style.overflowY = '';
};

export const clipboardCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
};
