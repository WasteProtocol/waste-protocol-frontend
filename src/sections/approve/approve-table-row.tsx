import type { ISuccessResult } from '@worldcoin/idkit';
import { useIDKit, IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';

import { verify } from 'src/actions/verify';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  onApproveRow: (tradeId: number) => void;
};

export default function ApproveTableRow({ row, onApproveRow }: Props) {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error('app_id is not set in environment variables!');
  }
  if (!action) {
    throw new Error('action is not set in environment variables!');
  }

  const { setOpen } = useIDKit();

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

  const onSuccess = (result: ISuccessResult) => {
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
    console.log(result.nullifier_hash);
    // onApproveRow();
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log('Proof received from IDKit, sending to backend:\n', JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
    const data = await verify(result);
    if (data.success) {
      console.log('Successful response from backend:\n', JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

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
              // onApproveRow();
              confirm.onFalse();
            }}
          >
            Approve
          </Button>
        }
      />

      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />
    </>
  );
}
