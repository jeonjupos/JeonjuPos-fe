import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Layout from '@/views/layout';
import JwButton from '@/views/components/common/button/JwButton';
import useService from '@/hooks/useService';
import {TableInfo} from '@/api/generated/SpaceApi';
import SpaceTable from '@/views/components/home/SpaceTable';
import TextInput from '@/views/components/common/input/TextInput';

interface PropsType {
    className?: string;
}

// noinspection LessResolvedByNameOnly
const Root = styled(Layout)`
  .container{ .rel; .pr(150); }
  .system-menu-list{ .abs; .rt(0); .z(2); .flex; .flex-column; .row-gap(1); .wh(150, 100%); 
    ${JwButton} { .hf; .bgc(darkgray); font-weight: 300; }
    button{
      color: red;
    }
  }
  .table-cont{ .hf;
    ${SpaceTable} { .hf; }
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
      <div className="system-menu-list">
        <JwButton className="awdawd">주문 관리</JwButton>
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
