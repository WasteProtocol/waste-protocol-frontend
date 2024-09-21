import { ApexOptions } from 'apexcharts';

import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      year: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function EcommerceYearlySales({ title, subheader, chart, ...other }: Props) {
  const { colors, categories, series, options } = chart;

  const chartOptions = useChart({
    colors,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }}>
          <Chart
            dir="ltr"
            type="area"
            series={item.data}
            options={chartOptions}
            width="100%"
            height={364}
          />
        </Box>
      ))}
    </Card>
  );
}
