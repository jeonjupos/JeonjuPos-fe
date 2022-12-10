import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import OrderPanel from '@/views/components/order/OrderPanel';
import JwButton from '@/views/components/common/button/JwButton';
import {ReactComponent as SvgIcoPlus} from '@imgs/icon/ico-sm-plus.svg';
import {ReactComponent as SvgIcoMinus} from '@imgs/icon/ico-sm-minus.svg';
import {ReactComponent as SvgIcoArrow} from '@imgs/icon/ico-top-arrow.svg';
import NumericKeypad from '@/views/components/common/NumericKeypad';
import {MenuInfo} from '@/api/generated/MenuApi';
import {commaDecimal} from '@/utils/numberUtils';
import {makeClass} from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
  orderList: (MenuInfo & { amount: number, discount: number })[];
  changeMenuKey?: number;
  updateOrderList?: (orderList: (MenuInfo & { amount: number, discount: number })[]) => void;
}

const OrderTableComp = ({className, orderList, changeMenuKey = 0, updateOrderList}: PropsType) => {
  const scrollEl = useRef<HTMLDivElement | null>(null);

  const [selectMenuKey, setSelectMenuKey] = useState(0);
  const [changeType, setChangeType] = useState<'sale' | 'amount' | ''>('');

  const totalInfo = useMemo(() => orderList.reduce((acc, cur) => ({
    amount: acc.amount += cur.amount,
    discount: acc.discount += cur.discount,
    price: acc.price += cur.amount * cur.saleprice,
  }), { amount: 0, price: 0, discount: 0}), [orderList]);

  const selectMenu = (key: number) => {
    const tableRowEls = scrollEl.current?.querySelectorAll('tr');
    if(tableRowEls) tableRowEls.forEach(el => el.classList.remove('change'));
    setSelectMenuKey(key);
    setChangeType('');
  }

  const handleAmountChange = (type: 'increase' | 'decrease') => {
    const index = orderList.findIndex(order => selectMenuKey ? order.menupkey === selectMenuKey : order.menupkey === changeMenuKey);
    if(index === -1) return;

    if(type === 'increase') orderList[index].amount += 1;
    else if(type === 'decrease' && orderList[index].amount > 1) orderList[index].amount -= 1;

    setChangeType('');
    updateOrderList && updateOrderList([...orderList]);
  }

  const handleKeypadChange = (value: number) => {
    const index = orderList.findIndex(order => selectMenuKey ? order.menupkey === selectMenuKey : order.menupkey === changeMenuKey);
    if(index === -1) return;

    if(changeType === 'sale'){
      orderList[index].discount = value;
    }else if(changeType === 'amount'){
      orderList[index].amount = value;
    }

    updateOrderList && updateOrderList([...orderList]);
  }

  const handleOrderbyChange = (type: 'up' | 'down') => {
    const index = orderList.findIndex(order => selectMenuKey ? order.menupkey === selectMenuKey : order.menupkey === changeMenuKey);
    if(index === -1) return;

    if(type === 'up' && index > 0){
      const temp = orderList[index - 1];
      orderList[index - 1] = orderList[index];
      orderList[index] = temp;
    }else if(type === 'down' && index + 1 < orderList.length){
      const temp = orderList[index + 1];
      orderList[index + 1] = orderList[index];
      orderList[index] = temp;
    }

    updateOrderList && updateOrderList([...orderList]);
  }

  const handleDelete = (key?: number) => {
    updateOrderList && updateOrderList(key === undefined ? [] : orderList.filter(order => order.menupkey !== key));
  }

  const handleChangeType = (type: 'sale' | 'amount' | '') => {
    if(type === changeType) setChangeType('');
    else setChangeType(type);

    setSelectMenuKey(0);
  }

  useEffect(() => {
    if(scrollEl.current){
      const focusEl = scrollEl.current?.querySelector(`.change`) as (HTMLTableRowElement | null);
      scrollEl.current.scrollTop = focusEl?.offsetTop ?? scrollEl.current?.scrollHeight;
    }
  },[orderList])

  useEffect(() => {
    setSelectMenuKey(0);
    setChangeType('');
  } , [changeMenuKey])

  return (
    <div className={className}>
      <div className="top">
        <OrderPanel />
        <div className="order-table-cont">
          <table className="order-table">
            <thead>
            <tr>
              <th>-</th>
              <th>메뉴명</th>
              <th>단가</th>
              <th>수량</th>
              <th>할인</th>
              <th>금액</th>
            </tr>
            </thead>
          </table>
          <div ref={scrollEl} className="scroll-area">
            <table className="order-table">
              <tbody>
              {orderList.map((order, index) => (
                <tr key={`${order.menupkey}-${order.amount}-${index}`} className={makeClass({change: changeMenuKey === order.menupkey, selected: selectMenuKey === order.menupkey})} onClick={() => selectMenu(order.menupkey)}>
                  <td>{index + 1}</td>
                  <td>{order.menuname}</td>
                  <td>{commaDecimal(order.saleprice)}</td>
                  <td key={order.amount}>{order.amount}</td>
                  <td>{commaDecimal(order.discount ? order.discount * -1 : 0)}</td>
                  <td>{commaDecimal((order.saleprice * order.amount) - order.discount)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <table className="order-result-table">
            <thead>
            <tr>
              <th>합계</th>
              <th>{totalInfo.amount}</th>
              <th>0</th>
              <th>{commaDecimal(totalInfo.price)}</th>
            </tr>
            </thead>
          </table>
        </div>
        <div className="control-btn-area">
          <JwButton ripple={{color: '#69708a'}} disabled={!orderList.length} onClick={() => handleDelete()}>전체 취소</JwButton>
          <JwButton ripple={{color: '#69708a'}} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleDelete(selectMenuKey || changeMenuKey)}>선택 취소</JwButton>
          <JwButton ripple={{color: '#69708a'}} className={makeClass({active: changeType === 'sale'})} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleChangeType('sale')}>할인 처리</JwButton>
          <JwButton ripple={{color: '#69708a'}} className={makeClass({active: changeType === 'amount'})} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleChangeType('amount')}>수량 변경</JwButton>
          <JwButton ripple={{color: '#69708a'}} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleAmountChange('decrease')}><SvgIcoMinus /></JwButton>
          <JwButton ripple={{color: '#69708a'}} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleAmountChange('increase')}><SvgIcoPlus /></JwButton>
          <JwButton ripple={{color: '#69708a'}} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleOrderbyChange('up')}><SvgIcoArrow className="ico-arrow top" /></JwButton>
          <JwButton ripple={{color: '#69708a'}} disabled={!selectMenuKey && !changeMenuKey} onClick={() => handleOrderbyChange('down')}><SvgIcoArrow className="ico-arrow bottom" /></JwButton>
        </div>
      </div>
      <div className="bottom">
        <div className="total-info">
          <div className="info-cont">
            <ul className="info-list">
              <li>
                <span className="label">총 금액</span>
                <span className="value">{commaDecimal(totalInfo.price)}</span>
              </li>
              <li>
                <span className="label">할인 금액</span>
                <span className="value">{commaDecimal(totalInfo.discount)}</span>
              </li>
              <li className="emphasis">
                <span className="label">받을 금액</span>
                <span className="value">{commaDecimal(totalInfo.price - totalInfo.discount)}</span>
              </li>
              <li>
                <span className="label">받은 금액</span>
                <span className="value">0</span>
              </li>
              <li className="emphasis">
                <span className="label">거스름돈</span>
                <span className="value">0</span>
              </li>
            </ul>
          </div>
        </div>
        <NumericKeypad disabled={!changeType} onChangeValue={handleKeypadChange} />
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const OrderTable = styled(OrderTableComp)`
  .hf;
  > .top, > .bottom { .h(50%); .crop; }
  ${OrderPanel} { .mb(5); }
  .order-table-cont { .calc-h(100%, 98); .-a(#DDD);
    .scroll-area { .calc-h(100%, 66); .scroll-y; }
  }
  .order-table { .wf;
    tr {
      &.change, &.selected{ .bgc(#c9e0f4); }
      th, td { .px(5); .py(10); .fs(13); .tc;
        &:nth-of-type(1) { .w(10%); }
        &:nth-of-type(2) { .w(30%); .tl; }
        &:nth-of-type(3) { .w(16.6%); }
        &:nth-of-type(4) { .w(10%); }
        &:nth-of-type(5) { .w(16.6%); }
        &:nth-of-type(6) { .w(16.6%); }
      }
      th { .c(white); .bold; .bgc(black); }
      td { .c(black); .-b(#DDD); }
    }
  }
  .order-result-table { .wf;
    tr {
      th, td { .px(5); .py(10); .fs(13); .c(white); .tc; .bgc(black);
        &:nth-of-type(1) { .w(56.6%); }
        &:nth-of-type(2) { .w(10%); }
        &:nth-of-type(3) { .w(16.6%); }
        &:nth-of-type(4) { .w(16.6%); }
      }
    }
  }
  .control-btn-area { .flex; .col-gap(8); .wf; .mt(10);
    ${JwButton} { .wf; .h(50); .p(10); .fs(13); .c(#69708A); .bgc(#EEE); .br(5);
      &.active{ .c(black); .-a(black, 2px); .bgc(gainsboro); }
      svg { .h(13);
        path, rect { fill: #69708A; }
      }
      .ico-arrow {
        &.top { }
        &.bottom { .t-r(180deg); }
        path { fill: transparent; stroke: #69708A; }
      }
    }
  }
  > .bottom { .flex; .col-gap(8px); flex-wrap: wrap;
    > div { .w(calc((100% - 8px) / 2)); .hf; .py(10); }
    .total-info {
      .info-cont { .hf; .p(12, 18); .bgc(#434343); .-a(#777, 5px); .br(5); }
      .info-list { .flex; .flex-column; .hf;
        li { .flex; .items-center; .space-between; .hf; .fs(18); .c(white);
          &.emphasis { .c(#FFAA5C); }
        }
      }
    }
  }
`;

export default OrderTable;
