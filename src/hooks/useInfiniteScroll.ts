import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ParamsType {
  target: React.MutableRefObject<HTMLElement | null>;
  list: any[] | null;
  hasNext: boolean;
}

const useInfiniteScroll = ({ target, list, hasNext } : ParamsType) => {
  const firstLoaded = useRef(false);
  const [count, setCount] = useState<number>(0);
  const [createObsEl, setCreateObsEl] = useState<HTMLDivElement | null>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        if (target?.current === null) return;
        if (entries[0].isIntersecting) {
          setCount(v => v + 1);
          // setCount가 무한으로 올라가는 것을 방지하기 위한 연결 끊음
          observer.disconnect();
        }
      },
    );
  }, [target]);

  const useInfiniteMore = (func: Function, deps: any[] = []) => useEffect(() => {
    if (firstLoaded.current) func();
    firstLoaded.current = true;
  }, [...deps, count]);

  useEffect(() => {
    if (target?.current) {
      // 데이터가 정상적으로 추가됐을 때, 다시 관찰을 시작
      if (hasNext && (list || []).length > 0) {
        createObsEl && observer.observe(createObsEl);
      }
    }

    return () => {
      if (target.current !== null && observer) {
        observer.unobserve(target.current);
      }
    };
  }, [target, list, hasNext, createObsEl]);

  useEffect(() => {
    const isExist = document.querySelector('#infiniteEl');
    if (target?.current && !createObsEl && !isExist) {
      const divEl = document.createElement('div');
      divEl.id = 'infiniteEl';
      divEl.setAttribute('style', 'width: 100%; height: 2px;');
      setTimeout(() => { if (target?.current) target.current.append(divEl); }, 100);
      setCreateObsEl(divEl);
    }
  }, [target, createObsEl]);

  return {
    count,
    setCount,
    infiniteCall: count,
    useInfiniteMore,
  };
};

export default useInfiniteScroll;
