import React, { useState, useEffect, useCallback } from 'react';

const useClickOutSide = (ref: React.MutableRefObject<any>, callBack?: (e: MouseEvent) => void) => {
  const [open, setOpen] = useState(false);

  const toggleStatus = useCallback((status?: unknown) => {
    if (typeof status !== 'boolean') setOpen(!open);
    else setOpen(status);
  }, [open]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (callBack) callBack(e);
    const nextBody = document.querySelector('#__next') as HTMLDivElement;
    if (nextBody.contains(e.target as Node)) {
      if (ref.current !== e.target && !ref.current.contains(e.target as Node)) {
        toggleStatus(false);
      }
    }
  }, [callBack, ref, toggleStatus]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside, ref]);

  return { open, setOpen, toggleStatus };
};

export default useClickOutSide;
