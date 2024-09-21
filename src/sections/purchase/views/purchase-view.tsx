'use client';

import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PurchaseList from '../purchase-list';
import WidgetSummary from '../widget-summary';

export default function PurchaseView() {
  const init = useBoolean(true);

  const [tableData, setTableData] = useState<[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${HOST_API}/trades`);
      console.log(data);
      setTableData(data.results);
      init.onFalse();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (init.value) return <div>Loading...</div>;

  const totalEmissionAmount = tableData?.reduce(
    (sum, item: any) => sum + item.totalEmissionAmount,
    0
  );
  const totalTokenReceived = tableData?.reduce(
    (sum, item: any) => sum + item.totalTokenReceived,
    0
  );
  const totalUSDCReceived = tableData?.reduce((sum, item: any) => sum + item.totalUSDCReceived, 0);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Purchase"
        links={[]}
        action={
          <Button
            component={RouterLink}
            href={paths.purchaseNew}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Purchase
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={4} md={4}>
            <WidgetSummary
              title="Total Emission"
              total={totalEmissionAmount}
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={4} md={4}>
            <WidgetSummary
              title="Total Token Received"
              total={totalTokenReceived}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={4} md={4}>
            <WidgetSummary
              title="Total USDC Received"
              total={totalUSDCReceived}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>
        </Grid>

        <PurchaseList tableData={tableData} />
      </Stack>
    </Container>
  );
}
