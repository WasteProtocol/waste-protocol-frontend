import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

export default function PurchaseTableRow({ row }: Props) {
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
    </TableRow>
  );
}
