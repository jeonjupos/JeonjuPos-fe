import React from 'react';
import styled from 'styled-components';

interface PropsType {
    className?: string;
}

const TableThumbComp = ({className}: PropsType) => {
  return (
    <div className={className}>
      <div className="info">
        <div className="table-no">1번 테이블</div>
        <ul className="menu-list">
          <li>
            <div className="name-with-cnt">
              <span className="menu-name">떡볶이</span>
              <span className="menu-cnt">3</span>
            </div>
            <div className="price">
              3,000
            </div>
          </li>
          <li>
            <div className="name-with-cnt">
              <span className="menu-name">소주</span>
              <span className="menu-cnt">1</span>
            </div>
            <div className="price">
              4,000
            </div>
          </li>
          <li>
            <div className="name-with-cnt">
              <span className="menu-name">맥주</span>
              <span className="menu-cnt">1</span>
            </div>
            <div className="price">
              4,000
            </div>
          </li>
        </ul>
      </div>
      <div className="total">
        <span className="label">금액</span>
        <span className="value">3000</span>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TableThumb = styled(TableThumbComp)`
  .flex; .flex-column; .space-between; .hf; .p(12); .bgc(cadetblue); .br(6);
  .info {
    .table-no { .mb(10); .fs(14); .bold; }
    .menu-list { .hf; .p(10); .bgc(ghostwhite);
      li { .flex; .items-center; .space-between; .fs(14, 21);
        .name-with-cnt {
          .menu-name {}
          .menu-cnt { .ml(4); }
        }
        .price {}
      }
    }
    .total { .flex; .items-center; .space-between; .mt(10);
      .label { .bold; }
      .value { .bold; }
    }
  }
`;

export default TableThumb;
