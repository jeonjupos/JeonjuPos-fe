import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import JwButton from '@/views/components/common/button/JwButton';
import useService from '@/hooks/useService';
import {CategoryInfo, CategoryMenuListType, MenuInfo} from '@/api/generated/MenuApi';
import {commaDecimal} from '@/utils/numberUtils';
import {makeClass} from '@/utils/forReactUtils';
import {useNavigate} from 'react-router-dom';

interface PropsType {
    className?: string;
    spacePkey?: string;
    orderList: (MenuInfo & { amount: number, discount: number })[];
    onSelectMenu?: (menu: MenuInfo) => void;
}

const MenuTableComp = ({className, spacePkey, orderList, onSelectMenu}: PropsType) => {
  const {menu, order} = useService();
  const navigate = useNavigate();

  const [categoryKey, setCategoryKey] = useState(0);
  const [categoryList, setCategoryList] = useState<CategoryInfo[]>([]);
  const [categoryMenuList, setCategoryMenuList] = useState<CategoryMenuListType[]>([]);

  const menuList = useMemo(() => categoryMenuList.find(cml => cml.categorypkey === categoryKey)?.menulist || [],[categoryKey])

  const getMenuList = async () => {
    const {categorylist, categorymenulist} = await menu.getMenuList();

    setCategoryList(categorylist);
    setCategoryMenuList(categorymenulist);
    setCategoryKey(categorylist[0].categorypkey);
  }

  const selectCategory = useCallback((key: number) => {
    setCategoryKey(key);
  }, []);

  const selectMenu = useCallback((menu: MenuInfo) => {
    onSelectMenu && onSelectMenu(menu);
  }, [onSelectMenu]);

  const submitOrder = async () => {
    if(!spacePkey || orderList.length === 0) return;
    const params = {spacepkey: Number(spacePkey), ordermenulist: orderList.map(order => ({menupkey: order.menupkey, discount: order.discount, count: order.amount})), takeoutyn: false}
    await order.sendOrder(params);

    navigate(-1);
  }

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <div className={className}>
      <div className="category-list">
        {categoryList.map(category => (
          <JwButton key={category.categorypkey} className={makeClass({active: categoryKey === category.categorypkey})} onClick={() => selectCategory(category.categorypkey)}>
            {category.categoryname}
          </JwButton>
        ))}
      </div>
      <div className="menu-list">
        {Array.from({length: 24}).map((_, idx) => menuList[idx] ? (
          <div key={`${categoryKey}-${menuList[idx].menupkey}`} className="menu-box">
          <JwButton className="menu" ripple={{color: '#ddd'}} onClick={() => selectMenu(menuList[idx])}>
            <div className="name">{menuList[idx].menuname}</div>
            <div className="price-area">
              <span className="price">{commaDecimal(menuList[idx].saleprice)}</span>
            </div>
          </JwButton>
        </div>
        ) : (<div key={idx} className="menu-box"></div>))}
      </div>
      <div className="btn-area">
        <JwButton onClick={submitOrder}>주문</JwButton>
        <JwButton>현금</JwButton>
        <JwButton>신용카드</JwButton>
        <JwButton>후불처리</JwButton>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const MenuTable = styled(MenuTableComp)`
  .hf;
  .category-list{ .h(50); .mb(14);
    ${JwButton}{ .min-w(100); .h(50); .mr(6); .px(12); .fs(14); .c(#eee); .bgc(#888); .br(4); 
      &.active{ .c(black); .-a(black, 3px); .bgc(gainsboro); }
    }
  }
  .menu-list{ .flex; flex-wrap: wrap; .calc-h(100%, 200); .col-gap(6px); .row-gap(6px);
    .menu-box{ .w(calc((100% - 18px) / 4)); .h(calc((100% - 30px) / 6)); .bgc(#f5f5f5); .br(4);
      .menu{ .flex; .flex-column; .space-between; .wh(100%); .p(10); .bgc(white); .-a(#f5f5f5, 2px); .br(4);
        .name{ .fs(16, 20); }
        .price-area{ .tr;
          .price{ .c(red); }
        }
      }
    }
  }
  .btn-area{ .flex; .col-gap(6); .mt(14);
    ${JwButton} { .wf; .h(110); .c(white); .bgc(#555); .br(5); }
  }
`;

export default MenuTable;
