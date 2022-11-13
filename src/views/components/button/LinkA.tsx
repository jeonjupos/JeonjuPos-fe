import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { LinkProps } from 'next/dist/client/link';

export interface PropsType extends LinkProps {
  className?: string;
  children: React.ReactNode | string;
}

const LinkAComp = (props: PropsType) => {
  const { children, className } = props;
  const linkHref = { ...props, className: undefined };

  return (
    <Link {...linkHref}>
      <a className={className}>
        {children}
      </a>
    </Link>
  );
};

// noinspection LessResolvedByNameOnly
const LinkA = styled(LinkAComp)`
`;

export default LinkA;
