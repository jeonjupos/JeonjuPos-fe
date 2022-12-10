import React from 'react';
import styled from 'styled-components';
import {makeClass} from '@/utils/forReactUtils';
import {TableInfo} from '@/api/generated/SpaceApi';
import TableThumb from '@/views/components/home/TableThumb';

interface PropsType {
  className?: string;
  list: (TableInfo | null)[][];
}

const SpaceTableComp = ({className, list}: PropsType) => {
  return (
    <table className={className}>
      <tbody>
      {list.map((row, index) => (
        <tr key={`row-${index}`}>
          {row.map((table, index2) => <td key={`row-td-${index2}`} className={makeClass({empty: !table})}>{table ? <TableThumb info={table} /> : ''}</td>)}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

// noinspection LessResolvedByNameOnly
const SpaceTable = styled(SpaceTableComp)`
  .wf; .h(calc(100vh - 83px)); table-layout: fixed;
  tr {
    td { .-a(transparent, 10px); height: ${props => `calc(100% / ${props.list.length < 4 ? 4 : props.list.length})`};
      ${TableThumb} { .max-w(300); .mh-c; }
    }
  }
`;

export default SpaceTable;
