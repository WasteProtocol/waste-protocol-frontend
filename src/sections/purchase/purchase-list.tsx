/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import PurchaseTableRow from './purchase-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'No', label: 'Trade ID', width: 100, align: 'center' },
  { id: 'Date', label: 'Date' },
  { id: 'Purpose', label: 'Purpose' },
  { id: 'Location', label: 'Location' },
  { id: 'TotalEmission', label: 'Total Emission', width: 220, align: 'center' },
  { id: 'TokenReceived', label: 'Total Token Received', width: 220, align: 'center' },
  { id: 'USDCReceived', label: 'Total USDC Received', width: 220, align: 'center' },
  { id: 'Status', label: 'Status', width: 120, align: 'center' },
];

// ----------------------------------------------------------------------
type Props = {
  tableData: any;
};

export default function UserListView({ tableData }: Props) {
  const table = useTable();

  const notFound = !tableData.length;

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {tableData.map((row: any) => (
                <PurchaseTableRow key={row.id} row={row} />
              ))}

              <TableEmptyRows
                height={76}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}
