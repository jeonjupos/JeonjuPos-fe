import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import SvgIcoSmArrow from '@/public/imgs/icon/ico-sm-arrow.svg';
import { makeClass } from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
  page: number;
  pageSize?: number;
  totalCount: number;
  listSize?: number;
  bigStepArrows?: boolean;
  changePage?: (page: number) => void;
}

const PaginationComp = ({ className, page, pageSize = 10, totalCount, listSize = 20, bigStepArrows = false, changePage }: PropsType) => {
  const pageList = useMemo(() => {
    const pageGroupArr = Array.from({ length: (totalCount / (pageSize * listSize)) + 1 }).map(() => [] as number[]);
    const perPageListCnt = Math.floor(totalCount / listSize);
    const remainder = totalCount % listSize;
    const list = Array.from({ length: remainder ? perPageListCnt + 1 : perPageListCnt }).map((_, idx) => idx + 1);
    for (let i = 0; i < pageGroupArr.length; i += 1) {
      if (list.length === 0) break;
      for (let j = 0; j < pageSize; j += 1) {
        const num = list.shift();
        if (!num) break;
        pageGroupArr[i].push(num);
      }
    }
    return pageGroupArr.find(group => group.includes(page)) || [1];
  }, [page, listSize, totalCount, pageSize]) as number[];

  const pageMove = useCallback((pageNum: number) => {
    changePage && changePage(pageNum);
  }, [changePage]);

  const nextPage = useCallback(() => {
    if (pageList[pageList.length - 1] === page) return;
    pageMove(page + 1);
  }, [page, listSize, totalCount, pageMove]);

  const prevPage = useCallback(() => {
    if (page === 1) return;
    pageMove(page - 1);
  }, [page, pageMove]);

  return (
    <div className={className}>
      <div className="arrow-cont">
        {bigStepArrows && (<button className="btn-big-prev">prev</button>)}
        <button className="btn-prev" disabled={page === 1} onClick={prevPage}>
          <SvgIcoSmArrow />
        </button>
      </div>
      <div className="number-list">
        {pageList.map(num => (<button key={num} className={makeClass([{ active: page === num }])} onClick={() => pageMove(num)}>{num}</button>))}
      </div>
      <div className="arrow-cont">
        <button className="btn-next" disabled={pageList[pageList.length - 1] === page} onClick={nextPage}>
          <SvgIcoSmArrow />
        </button>
        {bigStepArrows && (<button className="btn-big-prev">next</button>)}
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const Pagination = styled(PaginationComp)`
    .flex-center; .col-gap(20);
  .arrow-cont{
    .btn-prev, .btn-next{ .inline-flex; .justify-center; .items-center; .wh(9,28);
      svg{ .w(9); 
        path { fill: @indigoGrey[@150]; }
      }
      &:disabled{ .o(0.5); cursor: not-allowed; }
    }
    .btn-prev{ 
      svg{ .t-r(180deg); }
    }
  }
  .number-list{ .flex; .items-center; .col-gap(8); .fs(14); 
    >button{ .min-w(28); .h(28); .px(6); .fs(14); .c(@indigoGrey[@150]); .pointer;
      &.active{ .bold; .c(@indigoVivid[@500]); .bgc(white); .-a(@grayScale[@e6]); }
    }
  }
`;

export default Pagination;
