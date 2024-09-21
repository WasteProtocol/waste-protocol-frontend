'use client';

import Container from '@mui/material/Container';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PurchaseNewEditForm from '../purchase-new-edit-form';

export default function PurchaseNewView() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="New Purchase"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <PurchaseNewEditForm />
    </Container>
  );
}
