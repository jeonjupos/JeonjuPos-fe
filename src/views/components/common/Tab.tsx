import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Ripple, { DEFAULT_RIPPLE_OPTION, RippleOption } from '@components/common/Ripple';
import { isClient } from '@/constants/common';
import { makeClass } from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
  list: string[] | { label:string, value: string | number, disabled?: boolean }[];
  value?: string | number;
  name?: string;
  slider?: boolean;
  disabled?: boolean;
  ripple?: RippleOption;
  change?: (value: any, name:string) => void;
}

const TabComp = ({ className, list, value, name = 'tab', slider = false, ripple = DEFAULT_RIPPLE_OPTION, disabled = false, change }: PropsType) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLSpanElement | null>(null);
  const swiperRef = useRef<any>();

  const [data, setData] = useState(value);

  const tabList = useMemo(() => list.map(item => (typeof item === 'string' ? { label: item, value: item } : item)), [list]);

  const drawSlider = useCallback(() => {
    const el = ref.current;
    const sliderEl = sliderRef.current;

    if (!slider || !sliderEl || !el) return;

    const targetEl = el.querySelector('.swiper-slide.on') as HTMLButtonElement;

    if (sliderEl && targetEl) {
      const { offsetLeft, clientWidth } = targetEl;
      sliderEl.style.left = `${offsetLeft}px`;
      sliderEl.style.width = `${clientWidth}px`;
    } else {
      sliderEl.style.left = '0px';
      sliderEl.style.width = '0px';
    }
  }, [slider]);

  const changeTab = useCallback((newVal: string | number, index: number) => {
    swiperRef.current.slideTo(index - 1, 300);
    change && change(newVal, name);
    if (value === undefined) setData(newVal);
  }, [value, change, name, drawSlider]);

  useEffect(() => {
    if (typeof value !== 'undefined' && value !== data) setData(value);
    else if (typeof value === 'undefined') setData(tabList[0].value);
  }, [value]);

  useEffect(() => {
    drawSlider();
  }, [data, drawSlider]);

  useEffect(() => {
    if (isClient) {
      drawSlider();
      window.addEventListener('resize', drawSlider);
    }

    return () => {
      if (isClient) window.removeEventListener('resize', drawSlider);
    };
  }, [drawSlider]);

  return (
    <div ref={ref} className={className}>
      <Swiper modules={[FreeMode]} slidesPerView="auto" freeMode onSwiper={swiper => { swiperRef.current = swiper; }}>
        {tabList.map((tab, index) => (
          <SwiperSlide key={`${tab.label}-${index}`} className={makeClass(['tab', { on: data === tab.value }])}>
            <Ripple {...ripple} disabled={tab.disabled || ripple.disabled}>
              {/* eslint-disable-next-line react/no-danger,jsx-a11y/control-has-associated-label */}
              <button className={`${data === tab.value ? 'on' : ''}`} disabled={disabled || tab.disabled} onClick={() => changeTab(tab.value, index)} dangerouslySetInnerHTML={{ __html: tab.label }} />
            </Ripple>
            {(index === 0 && slider) && <span ref={sliderRef} className="slider" />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const Tab = styled(TabComp)`
   //.flex;
  button { .c(@grayScale[@55]); .pointer; user-select: none; 
    &.on { .c(@indigoNatural[@300]); .bold; }
    &:disabled{ .o(0.5); }
  }
  .swiper{ .rel; .m(0);
    .swiper-slide { .w; }
  }
  .tab-slide{ .wf;
    .swiper-slide { .w; }
  }
  .slider { .abs; .lb(0, 0); .z(1); .h(2); .bgc(@indigoNatural[@300]); transition: all 0.3s; }
`;

export default Tab;
