import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import WgTableRow from '@/views/components/common/table/JwTableRow';
import CheckBox from '@/views/components/common/input/CheckBox';
import _uniqueId from 'lodash/uniqueId';
import CircleLoading from '@/views/components/common/loading/CircleLoading';

type TableData = {
  id: string | number;
  [key: string]: any;
};

export type ThDataType = { name: string; filedId: string };

type ChildrenFuncParamsType<T> = {
  no: number;
  data: T extends (infer R)[] ? R : never;
};

type PropsType<T extends TableData[]> = {
  className?: string;
  tableData: T | null;
  children: (obj: ChildrenFuncParamsType<T>) => ReactNode;
  noDataMsg?: string;
  expendClassName?: string;
  checkIds?: any[];
  pageNum?: number;
  loading?: boolean;
  onCheckChange?: (checkIds: any[]) => void;
};

// noinspection LessResolvedByNameOnly
const JwTableContainer = styled.table<{ expendClassName?: string }>`
  table-layout: fixed; .wf; border-collapse: separate;


  ${props => `.${props.expendClassName}`} {
    > div { .crop; .max-h(0); transition: max-height 0.2s; }
    &.open {
      > div { .max-h(1000); transition: max-height 0.2s; }
    }
  }


  th, td { .vam; .tc;
    &:first-child {
      ${CheckBox} { vertical-align: bottom; }
    }
    &.expend-controller { .pointer; }
    .no-data{ .flex-center; .min-h(94); .fs(14, 18);
      ${CircleLoading}{ .py(80); }
    }
  }

  .expend-tr{ .p(0) !important; border: none !important; }
  
  &.wg-table{
    thead { .bgc(@indigoNatural[@500]);
      th { .h(50); .fs(14); .c(white); }
    }

    tr {
      td { .py(11); .-t(@grayScale[@e6]); }
    }
  }
`;

const uid = _uniqueId();

function JwTable<T extends TableData[]>({ className, tableData, children, noDataMsg, pageNum, expendClassName = 'expend-tr', checkIds, loading = false, onCheckChange }: PropsType<T>) {
  const [allCheck, setAllCheck] = useState(false);
  const [thData, setThData] = useState<ThDataType[]>([]);

  const tableRows = useMemo(() => (tableData || []).map(trData => ({ ...trData, key: trData.id + _uniqueId() }) as T extends (infer R)[] ? R : never), [tableData]);
  const useCheckbox = useMemo(() => Boolean(checkIds), [checkIds]);

  const updateThData = useCallback((newThData: ThDataType[]) => {
    console.log(newThData);
    setThData(newThData);
  }, []);

  const handleCheckIds = useCallback((newCheckIds: (string | number)[]) => {
    onCheckChange && onCheckChange(newCheckIds);
  }, [onCheckChange]);

  const handleAllCheck = useCallback((values: string[]) => {
    if (!tableRows) return;
    const checkStatus = values.length > 0;

    if (checkStatus) handleCheckIds(tableRows.map(data => data.id));
    else handleCheckIds([]);

    setAllCheck(checkStatus);
  }, [handleCheckIds, tableRows]);

  useEffect(() => {
    if (checkIds && checkIds.length === 0) setAllCheck(false);
  }, [checkIds]);

  useEffect(() => {
    setAllCheck(false);
  }, [pageNum]);

  return (
    <JwTableContainer className={className} expendClassName={expendClassName}>
      <thead>
        <tr>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {useCheckbox && (<th><CheckBox value="1" checked={allCheck} disabled={tableRows.length === 0} change={handleAllCheck} /></th>)}
          {thData.map((th, index) => (<th key={`${uid}-${index}`} className={th.filedId} data-filed-id={th.filedId}>{th.name}</th>))}
        </tr>
      </thead>
      <tbody>
        {
          tableRows.map((data, index) => (
            <WgTableRow
              key={data.key}
              tableUid={uid}
              checkId={data.id}
              checkIdList={checkIds}
              changeCheckId={handleCheckIds}
              useCheckbox={useCheckbox}
              updateThData={thData.length === 0 && index === 0 ? updateThData : undefined}
              expendClassName={expendClassName}
            >{children({ data, no: index + 1 })}
            </WgTableRow>
          ))
        }

        {tableRows.length === 0 && (
          <WgTableRow tableUid={uid} expendClassName={expendClassName} useCheckbox={useCheckbox} updateThData={updateThData} noDataMsg={noDataMsg || '검색 결과가 없습니다.'} loading={loading}>
            { children({ data: { id: '' } as any, no: 1 }) }
          </WgTableRow>
        )}
      </tbody>
    </JwTableContainer>
  );
}

export default JwTable;
