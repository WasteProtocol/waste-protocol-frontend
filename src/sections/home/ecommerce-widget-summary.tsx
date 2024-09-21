import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
}

export default function EcommerceWidgetSummary({
  title,

  total,

  sx,
  ...other
}: Props) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <Typography variant="h3" gutterBottom>
          {total}
        </Typography>
      </Box>
    </Card>
  );
}
