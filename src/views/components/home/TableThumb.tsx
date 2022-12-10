import React, {useMemo} from 'react';
import styled from 'styled-components';
import {TableInfo} from '@/api/generated/SpaceApi';
import {commaDecimal} from '@/utils/numberUtils';
import {useNavigate} from 'react-router-dom';

interface PropsType {
    className?: string;
    info: TableInfo;
}

const TableThumbComp = ({className, info}: PropsType) => {
  const navigate = useNavigate()
  const orderList = useMemo(() => info.orderlist.length === 0 ? null : info.orderlist,[info])

  const moveOrderPage = () => {
    navigate(`/order/${info.spacepkey}`);
  }

  return (
    <div className={className} onClick={moveOrderPage}>
      <div className="info">
        <div className="table-no">{info.spacenum}번 테이블</div>
        {orderList ? (
          <ul className="menu-list">
            {orderList.map((order, index) => (
              <li key={`${info.spacenum}-${order.menuname}-${index}`}>
                <div className="name-with-cnt">
                  <span className="menu-name">{order.menuname}</span>
                  <span className="menu-cnt">{order.menucount}</span>
                </div>
                <div className="price">
                  {commaDecimal(order.saleprice)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-list">
            <span>비어 있음</span>
          </div>
        )}
      </div>
      <div className="total">
        <span className="label">금액</span>
        <span className="value">{commaDecimal(info.amount)}</span>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TableThumb = styled(TableThumbComp)`
  .flex; .flex-column; .space-between; .hf; .p(12); .bgc(cadetblue); .br(6);
  .info { .flex; .flex-column; .hf;
    .table-no { .mb(10); .fs(14); .bold; .tc; }
    .menu-list, .empty-list { .hf; .p(10); .bgc(ghostwhite);
      li { .flex; .items-center; .space-between; .fs(14, 21);
        .name-with-cnt {
          .menu-name {}
          .menu-cnt { .ml(4); }
        }
        .price {}
      }
    }

    .empty-list{ .flex-center;
      >span{ .fs(13); .o(0.5); }
    }
  }

  .total { .flex; .items-center; .space-between; .mt(10);
    .label { .bold; }
    .value { .bold; }
  }
`;

export default TableThumb;
