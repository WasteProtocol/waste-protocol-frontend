'use client';

import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { HOST_API } from 'src/config-global';

import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import ApproveTableRow from '../approve-table-row';

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
  { id: 'action', label: 'Action', width: 120, align: 'center' },
];

// ----------------------------------------------------------------------

export default function ApproveView() {
  const init = useBoolean(true);
  const table = useTable();
  const [tableData, setTableData] = useState<[]>([]);

  const forceReload = useBoolean();
  const approve = useBoolean();
  const notFound = !tableData.length;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${HOST_API}/trades`);
      console.log(data);
      setTableData(data.results);
      init.onFalse();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceReload.value]);

  if (init.value) return <div>Loading...</div>;

  const onApproveRow = async (tradeId: number) => {
    try {
      approve.onTrue();

      await axios.get(`${HOST_API}/trades/approve/${tradeId}`);
    } catch (error) {
      console.log(error);
    } finally {
      approve.onFalse();
    }
  };

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Approve"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
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
                  <ApproveTableRow key={row.id} row={row} onApproveRow={onApproveRow} />
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
    </Container>
  );
}
