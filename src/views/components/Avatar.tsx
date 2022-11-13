import React, { useMemo } from 'react';
import styled from 'styled-components';
import WgImage from '@components/common/image/WgImage';
import { ListSkeleton } from '@components/common/Skeleton';

interface PropsType {
  className?: string;
  src?: string;
  name?: string;
}

const AvatarComp = ({ className, name, src }: PropsType) => {
  const imgUrl = useMemo(() => src, [src]);
  return (
    <div className={className}>
      <WgImage url={imgUrl} />
      {name ? <span className="nickname">{name}</span> : <ListSkeleton className="nickname" />}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const Avatar = styled(AvatarComp)`
  .flex; .items-center; 
  img { .ib; .vam; .wh(50); .br(50%); .-a(#f0f0f0); .crop; }
  .nickname{ .max-w(150); .ml(4); .fs(12); .c(#000); 
    &.skeleton{ .w(80); .hlh(20); .br(20);  }
  }
`;

// noinspection LessResolvedByNameOnly
export const ImgAvatar = styled(Avatar)`
  .nickname{ .hide; }
`;

export default Avatar;
