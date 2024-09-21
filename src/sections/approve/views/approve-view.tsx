'use client';

import type { ISuccessResult } from '@worldcoin/idkit';
import { useState, useEffect, useCallback } from 'react';
import { useIDKit, IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { verify } from 'src/actions/verify';
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
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error('app_id is not set in environment variables!');
  }
  if (!action) {
    throw new Error('action is not set in environment variables!');
  }

  const init = useBoolean(true);
  const table = useTable();
  const [tableData, setTableData] = useState<[]>([]);

  const forceReload = useBoolean();
  const approve = useBoolean();
  const notFound = !tableData.length;

  const [seletedTradeId, setSeletedTradeId] = useState<number | null>(null);

  const { setOpen } = useIDKit();

  const onSuccess = useCallback(() => {
    if (seletedTradeId) {
      onApproveRow(seletedTradeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seletedTradeId]);

  const handleProof = async (result: ISuccessResult) => {
    const data = await verify(result);
    if (!data.success) {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

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
      forceReload.onToggle();
    } catch (error) {
      console.log(error);
    } finally {
      approve.onFalse();
    }
  };

  const setOpenWorld = (tId: number) => {
    setOpen(true);
    setSeletedTradeId(tId);
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
                  <ApproveTableRow key={row.id} row={row} setOpenWorld={setOpenWorld} />
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

      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />
    </Container>
  );
}
