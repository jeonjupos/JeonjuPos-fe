import React, {useState} from 'react';
import styled from 'styled-components';
import Layout from '@/views/layout';
import OrderTable from '@/views/components/order/OrderTable';
import MenuTable from '@/views/components/order/MenuTable';
import {MenuInfo} from '@/api/generated/MenuApi';
import {useParams} from 'react-router-dom';

interface PropsType {
    className?: string;
}

// noinspection LessResolvedByNameOnly
const Root = styled(Layout)`
  .cont{ .flex; .flex-row; .hf;
    .left { flex: 4.8; .hf; .p(5); }
    .right{ flex: 5.2; .p(5); }
  }
`;

const MenuOrder = ({className}: PropsType) => {
  const {tableId} = useParams();
  const [changeMenuKey, setChangeMenuKey] = useState(0);
  const [orderList, setOrderList] = useState<(MenuInfo & {amount: number, discount: number})[]>([]);

  const selectMenu = (menu: MenuInfo) => {
    const index = orderList.findIndex(order => order.menupkey === menu.menupkey);

    if(index !== -1){
      orderList[index].amount += 1;
      setOrderList([...orderList]);
      setChangeMenuKey(orderList[index].menupkey);
    }else{
      setOrderList([...orderList, {...menu, amount: 1, discount: 0}])
      setChangeMenuKey(menu.menupkey);
    }
  }

  return (
    <Root className={className}>
      <div className="cont">
        <div className="left">
          <OrderTable orderList={orderList} changeMenuKey={changeMenuKey} updateOrderList={setOrderList} />
        </div>
        <div className="right">
          <MenuTable spacePkey={tableId} orderList={orderList} onSelectMenu={selectMenu} />
        </div>
      </div>
    </Root>
  );
};

export default MenuOrder;
