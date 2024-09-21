import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  categories: { name: string; id: string; price: number }[];
};

export default function InvoiceNewEditDetails({ categories }: Props) {
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const emissionRate = (index: number) =>
    categories.find((category) => category.id === values.items[index].wasteItemId)?.price;

  // const totalOnRow = values.items.map((item: IInvoiceItem) => item.quantity * item.price);

  // const subTotal = sum(totalOnRow);

  // const totalAmount = subTotal - values.discount - values.shipping + values.taxes;

  // useEffect(() => {
  //   setValue('totalAmount', totalAmount);
  // }, [setValue, totalAmount]);

  const handleAdd = () => {
    append({
      wasteItemId: '',
      amount: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  // const renderTotal = (
  //   <Stack
  //     spacing={2}
  //     alignItems="flex-end"
  //     sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
  //   >
  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Points earned</Box>
  //       <Box sx={{ width: 160 }}>{fNumber(234)}</Box>
  //     </Stack>

  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Coin Reward</Box>
  //       <Box
  //         sx={{
  //           width: 160,
  //         }}
  //       >
  //         USDC
  //       </Box>
  //     </Stack>

  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Coins received</Box>
  //       <Box
  //         sx={{
  //           width: 160,
  //         }}
  //       >
  //         {values.discount ? `- ${fNumber(1234)}` : '-'}
  //       </Box>
  //     </Stack>
  //   </Stack>
  // );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={0.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFSelect
                name={`items[${index}].wasteItemId`}
                size="small"
                label="Type"
                InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 320 },
                }}
              >
                {categories.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                type="number"
                name=""
                label="Price/Unit"
                InputLabelProps={{ shrink: true }}
                value={emissionRate(index)}
                disabled
                sx={{ maxWidth: { md: 100 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].amount`}
                label="Amount"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 140 } }}
              />
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>
      </Stack>

      {/* {renderTotal} */}
    </Box>
  );
}
