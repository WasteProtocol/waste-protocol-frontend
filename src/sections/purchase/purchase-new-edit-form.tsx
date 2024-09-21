'use client';

import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/use-boolean';

import FormProvider from 'src/components/hook-form';

import InvoiceNewEditDetails from './purchase-new-edit-details';
import InvoiceNewEditStatusDate from './purchase-new-edit-status-date';

// ----------------------------------------------------------------------

export default function PurchaseNewEditForm() {
  const loadingSend = useBoolean();

  const NewInvoiceSchema = Yup.object().shape({
    createDate: Yup.mixed<any>().nullable().required('Create date is required'),
    location: Yup.string().required('Location is required'),
    purpose: Yup.string().required('Purpose is required'),
    items: Yup.lazy(() =>
      Yup.array().of(
        Yup.object({
          wasteItemId: Yup.string().required('Title is required'),
          amount: Yup.number().required('Service is required'),
        })
      )
    ),
    // not required
  });

  const defaultValues = useMemo(
    () => ({
      location: '',
      purpose: '',
      createDate: new Date(),
      items: [
        {
          wasteItemId: '',
          amount: 0,
        },
      ],
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSend.onFalse();
      // router.push(paths.dashboard.invoice.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
    }
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
