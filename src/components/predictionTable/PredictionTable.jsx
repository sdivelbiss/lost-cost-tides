import React, { useContext, useMemo, Fragment } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Context } from '../../context/Context';
import { STATUS } from '../../constants/AppConstants';

const StyledTable = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  margin: 1rem;
  border-radius: 8px;
  overflow-y: auto;
  height: calc(100vh - 200px);
  .MuiTableRow-head {
    background-color: #eaeaea;
  }
`;

const PredictionTable = () => {
  // const { predictions, status, selectedUnit } = useContext(Context);
  const { predictions = [], status = '' } = useContext(Context);
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date', // accessor is the "key" in the data
      },
      {
        Header: 'Time (PT)',
        accessor: 'time',
      },
      {
        Header: `Predicted Height`,
        accessor: 'predictedHeight',
      },
      {
        Header: 'High/Low',
        accessor: 'highLow',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: predictions });

  const getRowProps = row => ({
    style: {
      background: row.original.isTooHigh ? 'rgba(226, 0, 0, 10%)' : 'rgba(0,226,70 , 10%)',
    },
  });

  if (status === '' || predictions.length === 0) {
    return <div>Select Above</div>;
  }

  if (status === STATUS.LOADING) {
    return <div>LOADING</div>;
  }
  if (status === STATUS.ERROR) {
    return <div>ERROR</div>;
  }

  return (
    <Fragment>
      <CssBaseline />
      <StyledTable>
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps(getRowProps(row))}>
                  {row.cells.map(cell => {
                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </StyledTable>
    </Fragment>
  );
};

export default PredictionTable;
