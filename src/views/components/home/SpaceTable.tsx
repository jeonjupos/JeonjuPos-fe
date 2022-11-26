import React from 'react';
import styled from 'styled-components';
import {makeClass} from '@/utils/forReactUtils';
import { TableInfo } from '@/api/generated/SpaceApi';
import TableThumb from '@/views/components/home/TableThumb';

interface PropsType {
    className?: string;
    list: (TableInfo | null)[][];
}

const SpaceTableComp = ({className, list}: PropsType) => {
  return (
    <table className={className}>
      {Array.from({length: 4}).map((_, index) => index).map(a => (
        <tr key={a}>
          <td className={makeClass({empty: a !== 0})}>
            {a === 0 && (
              <TableThumb />
            )}
          </td>
          <td className="empty"></td>
          <td className="empty"></td>
          <td className="empty"></td>
        </tr>
      ))}
      {/*{list.map((row, index) => (*/}
      {/*  <tr key={`row-${index}`}>*/}
      {/*    {row.map(table => <td className={makeClass({empty: !table})}>{table ? table.spacenum : ''}</td>)}*/}
      {/*  </tr>*/}
      {/*))}*/}
    </table>
  );
};

// noinspection LessResolvedByNameOnly
const SpaceTable = styled(SpaceTableComp)`
  .wf; .h(calc(100vh - 83px)); table-layout:fixed;
  tr{
    td{ .-a(transparent, 10px); height: ${props => `calc(100% / ${props.list.length < 4 ? 4 : props.list.length})`}; }
  }
`;

export default SpaceTable;
