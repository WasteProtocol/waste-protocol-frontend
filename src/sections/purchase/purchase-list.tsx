/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { HOST_API } from 'src/config-global';

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
  { id: 'status', label: 'No.', width: 100 },
  { id: 'name', label: 'Date' },
  { id: 'phoneNumber', label: 'Purpose', width: 180 },
  { id: 'company', label: 'Location', width: 220 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function UserListView() {
  const init = useBoolean(true);

  const table = useTable();

  const [tableData, setTableData] = useState<[]>([]);

  const notFound = !tableData.length;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${HOST_API}/trades`);
      console.log(data);
      setTableData(data.results);
      init.onFalse();
    })();
  }, []);

  if (init.value) return <div>Loading...</div>;

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
              {tableData
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row: any, i) => (
                  <PurchaseTableRow key={row.id} row={{ ...row, index: i }} />
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
