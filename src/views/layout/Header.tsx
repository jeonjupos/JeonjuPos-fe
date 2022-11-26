import React from 'react';
import styled from 'styled-components';
import JwButton from '@/views/components/common/button/JwButton';

interface PropsType {
    className?: string;
}

const HeaderComp = ({className}: PropsType) => {
  return (
    <header className={className}>
      <div className="hd-info">
        <h1 className="pos-name">전주 손칼국수 POS</h1>
        <span className="updated-at">2022-11-26 23:55:00</span>
      </div>
      <JwButton className="btn-delivery">배달 {'>'}</JwButton>
    </header>
  );
};

// noinspection LessResolvedByNameOnly
const Header = styled(HeaderComp)`
  .flex; .items-center; .space-between; .h(83); .px(20); .bgc(#444);
  .hd-info{ .flex-center; .col-gap(8);
    .pos-name{ .fs(28); .bold; .c(white); } 
    .updated-at{ .fs(13); .c(#ddd); }
  }
  .btn-delivery{ .wh(120,36); .px(12); .bgc(beige); .br(56); }
`;

export default Header;
