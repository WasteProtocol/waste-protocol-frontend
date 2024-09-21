import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import UserListView from '../purchase-list';
import WidgetSummary from '../widget-summary';

export default function PurchaseView() {
  return (
    <Container>
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={4} md={4}>
            <WidgetSummary
              title="Weekly Sales"
              total={714000}
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={4} md={4}>
            <WidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={4} md={4}>
            <WidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>
        </Grid>

        <UserListView />
      </Stack>
    </Container>
  );
}
