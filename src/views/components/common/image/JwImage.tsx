import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  src?: string;
  errorSrc?: string;
  url?: string;
  alt?: string;
  lazy?: boolean;
}

const JwImageComp = ({ className, src = '', errorSrc = '', url, alt, lazy = false }: PropsType) => {
  const { AWS_DOMAIN_URL } = process.env;

  const [loadStatus, setLoadStatus] = useState('loading');

  const imgSrc = useMemo(() => (url ? `${AWS_DOMAIN_URL}${url}`.replace('com//', 'com/') : src), [src, url, AWS_DOMAIN_URL]);

  const handleLoadError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgEl = e.target as HTMLImageElement;
    const { src } = imgEl;

    if (errorSrc && src !== errorSrc) imgEl.setAttribute('src', errorSrc);
    else setLoadStatus('error');
  };

  const handleLoaded = () => {
    setLoadStatus('loaded');
  };

  return <img src={imgSrc} className={`${className} ${loadStatus}`} alt={alt} onError={handleLoadError} onLoad={handleLoaded} />;
};

// noinspection LessResolvedByNameOnly
const JwImage = styled(JwImageComp)`
   pointer-events: none; text-indent: -9999px;
  
  &:not(.loaded){ animation: 1.5s ease-in-out 0.5s infinite normal none running skeleton-image; }
  
  &.loading{ .bgc(@grayScale[@e6]); }
  &.error{ .bgc(@grayScale[@e6]); }

  @keyframes skeleton-image {
    0% { .o(1); }
    50% { .o(0.4); }
    100% { .o(1); }
  }
`;

export default JwImage;
