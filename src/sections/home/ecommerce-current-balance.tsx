import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  sentAmount: number;
  currentBalance: number;
}

export default function EcommerceCurrentBalance({
  title,
  sentAmount,
  currentBalance,
  sx,
  ...other
}: Props) {
  const totalAmount = currentBalance - sentAmount;

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{totalAmount}</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Order Total
          </Typography>
          <Typography variant="body2">{currentBalance}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Earning
          </Typography>
          <Typography variant="body2">- {sentAmount}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Refunded
          </Typography>
          <Typography variant="subtitle1">{totalAmount}</Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained" color="warning">
            Request
          </Button>

          <Button fullWidth variant="contained" color="primary">
            Transfer
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
