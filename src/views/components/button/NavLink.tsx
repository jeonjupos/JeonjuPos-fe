import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import LinkA from '@components/common/button/LinkA';
import Link, { LinkProps } from 'next/dist/client/link';
import { useRouter } from 'next/router';

interface PropsType extends LinkProps {
  className?: string;
  exact?: boolean;
  activeClass?: string;
  children: React.ReactNode | string;
}

const NavLinkComp = (props: PropsType) => {
  const { children, className, href, exact = false, activeClass = 'active' } = props;
  const linkHref = { ...props, className: undefined };

  const { pathname } = useRouter();
  const isActive = useMemo(() => (exact ? pathname === href : pathname.startsWith(href as string)), [exact, href, pathname]);
  const activeClassName = useMemo(() => (isActive ? activeClass : ''), [activeClass, isActive]);

  return (
    <Link {...linkHref}>
      <a className={`${className} ${activeClassName}`}>
        {children}
      </a>
    </Link>
  );
};

// noinspection LessResolvedByNameOnly
const NavLink = styled(NavLinkComp)`

`;

export default NavLink;
