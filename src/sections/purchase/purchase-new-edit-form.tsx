/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { HOST_API } from 'src/config-global';

import FormProvider from 'src/components/hook-form';

import InvoiceNewEditDetails from './purchase-new-edit-details';
import InvoiceNewEditStatusDate from './purchase-new-edit-status-date';

// ----------------------------------------------------------------------

export default function PurchaseNewEditForm() {
  const loadingSend = useBoolean();
  const router = useRouter();
  const [wasteCategories, setWasteCategories] = useState([]);

  const init = useBoolean(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${HOST_API}/waste-items`);
      console.log(data);
      setWasteCategories(data.results);
      init.onFalse();
    })();
  }, []);

  const NewInvoiceSchema = Yup.object().shape({
    tradeDate: Yup.mixed<any>().nullable().required('Create date is required'),
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
      tradeDate: new Date(),
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      loadingSend.onFalse();

      const response = await axios.post(`${HOST_API}/trades`, data);
      router.push(paths.purchase);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
    }
  });

  if (init.value) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails categories={wasteCategories} />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleCreateAndSend}
        >
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
