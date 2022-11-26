import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Layout from '@/views/layout';
import JwButton from '@/views/components/common/button/JwButton';
import useService from '@/hooks/useService';
import {TableInfo} from '@/api/generated/SpaceApi';
import SpaceTable from '@/views/components/home/SpaceTable';

interface PropsType {
    className?: string;
}

// noinspection LessResolvedByNameOnly
const Root = styled(Layout)`
  .rel; .pr(150);
  >.menu-list{ .abs; .rt(0); .z(2); .flex; .flex-column; .row-gap(1); .wh(150, calc(100vh - 83px)); 
    ${JwButton} { .hf; .bgc(darkgray); }
  }
  .table-cont{ 
    ${SpaceTable} { .h(calc(100vh - 83px)); }
  }
`;

const Home = ({className}: PropsType) => {
  const {table} = useService();

  const [tableList, setTableList] = useState<(TableInfo | null)[][]>([]);

  const getTableList = async () => {
    const list = await table.getTableList();
    setTableList(list);
  }

  useEffect(() => {
    getTableList();
  }, [])

  return (
    <Root className={className}>
      <div className="menu-list">
        <JwButton>주문 관리</JwButton>
        <JwButton>메뉴 관리</JwButton>
        <JwButton>정산 관리</JwButton>
        <JwButton>명부 관리</JwButton>
        <JwButton>매출 관리</JwButton>
      </div>
      <div className="table-cont">
        <SpaceTable list={tableList} />
      </div>
    </Root>
  );
};

export default Home;
