import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  setOpenWorld: (tId: number) => void;
};

export default function ApproveTableRow({ row, setOpenWorld }: Props) {
  const confirm = useBoolean();

  const {
    tradeId,
    purpose,
    tradeDate,
    location,
    status,
    totalEmissionAmount,
    totalTokenReceived,
    totalUSDCReceived,
  } = row;

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          {tradeId}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(tradeDate)}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{purpose}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{location}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          {fNumber(totalEmissionAmount)}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          {fNumber(totalTokenReceived)}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          {fNumber(totalUSDCReceived)}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          <Label
            variant="soft"
            color={
              (status === 'Approved' && 'success') ||
              (status === 'Pending' && 'default') ||
              (status === 'Rejected' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {status === 'Pending' && (
            <IconButton
              onClick={() => {
                console.log({ tradeId });
                confirm.onTrue();
              }}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Approve"
        content="Are you sure want to approve?"
        action={
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setOpenWorld(tradeId);
              confirm.onFalse();
            }}
          >
            Approve
          </Button>
        }
      />
    </>
  );
}
