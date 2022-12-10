import React from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {getToday} from '@/utils/timeUtils';

interface PropsType {
    className?: string;
}

const OrderPanelComp = ({className}: PropsType) => {
  const {tableId} = useParams();

  return (
    <div className={className}>
      <ul>
        <li>
          <span className="label">영업일자 :</span>
          <span className="value">{getToday('YYYY-MM-DD')}</span>
        </li>
        <li>
          <span className="label">테이블 :</span>
          <span className="value">{tableId}번</span>
        </li>
        <li>
          <span className="label">결제 시간 :</span>
          <span className="value">최초 주문</span>
        </li>
      </ul>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const OrderPanel = styled(OrderPanelComp)`
  ul{ .flex; .items-center; .space-around; .p(10); .bgc(rgba(0,0,0,0.8)); .br(4);
    li{ .fs(12);
      .label{ .mr(4); .c(#ddd); }
      .value{ .c(white); }
    }
  }
`;

export default OrderPanel;
