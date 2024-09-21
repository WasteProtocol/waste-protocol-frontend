import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

export default function PurchaseTableRow({ row }: Props) {
  const { purpose, tradeDate, index, location } = row;

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(tradeDate)}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{purpose}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{location}</TableCell>

      {/* <TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{categoryId}</TableCell>
      </TableCell> */}

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {/* <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
      </TableCell>
    </TableRow>
  );
}
