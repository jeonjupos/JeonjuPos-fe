import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ThDataType } from '@components/common/table/WgTable';
import CheckBox from '@components/common/input/CheckBox';
import { makeClass } from '@/utils/forReactUtils';
import { isClient } from '@/constants/common';
import CircleLoading from '@components/common/loading/CircleLoading';

interface PropsType {
  expendClassName: string;
  children: ReactNode | string;
  tableUid: string;
  noDataMsg?: string;
  checkId?: string | number;
  checkIdList?: (string | number)[];
  changeCheckId?: (checkIds: (string | number)[]) => void;
  useCheckbox?: boolean;
  loading?: boolean;
  updateThData?: (thData: ThDataType[]) => void;
}

const WgTableRowComp = ({ expendClassName, tableUid, noDataMsg, children, checkId, checkIdList, changeCheckId, useCheckbox = false, loading = false, updateThData }: PropsType) => {
  const expendTdEl = useRef<HTMLTableDataCellElement | null>(null);
  const [expendOpen, setExpendOpen] = useState(false);

  const expendMaxHeightSet = useCallback((newStatus?: boolean) => {
    if (expendTdEl.current) {
      const status = typeof newStatus === 'boolean' ? newStatus : !expendOpen;
      const expendDivEl = expendTdEl.current.firstChild as HTMLDivElement;
      expendDivEl.style.maxHeight = status ? `${expendDivEl.scrollHeight}px` : '0px';
    }
  }, [expendTdEl, expendOpen]);

  const expendOpenToggle = useCallback(() => {
    expendMaxHeightSet();

    setExpendOpen(!expendOpen);
  }, [expendMaxHeightSet, expendOpen]);

  const thData = useMemo(() => {
    let childList = Array.isArray(children) ? children : [children];
    if (!childList[0]?.props) return [];
    childList = Array.isArray(childList[0].props.children) ? childList[0].props.children : [childList[0].props.children];
    return childList.filter(child => child.type.displayName === 'WgTableColumn').map(child => ({
      name: child.props.label as string,
      filedId: child.props.filedId as string,
    }));
  }, []);

  const columnList = useMemo(() => {
    let childList = Array.isArray(children) ? children : [children];
    if (!childList[0]?.props) return [];
    childList = Array.isArray(childList[0].props.children) ? childList[0].props.children : [childList[0].props.children];
    return childList.filter(child => child.type.displayName === 'WgTableColumn').map(child => ({
      ...child,
      props: { ...child.props, expendOpenToggle, expendOpen },
    }));
  }, [children, expendOpen, expendOpenToggle]);

  const expendChild = useMemo(() => {
    let childList = Array.isArray(children) ? children : [children];
    if (!childList[0]?.props) return [];
    childList = Array.isArray(childList[0].props.children) ? childList[0].props.children : [childList[0].props.children];

    return childList.find(child => child.type.displayName === 'WgTableExpend');
  }, [children]);

  const colSpan = useMemo(() => (useCheckbox ? thData.length + 1 : thData.length), [useCheckbox, thData]);

  useEffect(() => {
    updateThData && updateThData(thData);
  }, []);

  useEffect(() => {
    const resizeChangeExpendHeight = () => {
      setExpendOpen(false);
      expendMaxHeightSet(false);
    };

    if (isClient) {
      window.removeEventListener('resize', resizeChangeExpendHeight);
      window.addEventListener('resize', resizeChangeExpendHeight);
    }

    return () => {
      isClient && window.removeEventListener('resize', resizeChangeExpendHeight);
    };
  }, []);

  return (
    <>
      <tr>
        {Boolean(useCheckbox && !noDataMsg) && <td><CheckBox name={`table-checkbox-${tableUid}`} data={checkIdList} value={checkId} change={changeCheckId} /></td>}
        {noDataMsg ? (
          <td colSpan={colSpan}>
            <div className="no-data">
              {/* eslint-disable-next-line react/no-danger */}
              { loading ? <CircleLoading /> : <span dangerouslySetInnerHTML={{ __html: noDataMsg }} />}
            </div>
          </td>
        ) : columnList}
      </tr>
      {Boolean(expendChild) && (
      <tr>
        <td ref={expendTdEl} className={makeClass([expendClassName, { open: expendOpen }])} colSpan={colSpan}>
          {expendChild}
        </td>
      </tr>
      )}
    </>
  );
};

// noinspection LessResolvedByNameOnly
const WgTableRow = styled(WgTableRowComp)`
  
`;

export default WgTableRow;
