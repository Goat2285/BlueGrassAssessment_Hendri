import { Typography, Button, Stack, Grid, Card } from '@mui/material';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useForm } from 'react-hook-form';
import IncludedInPrice from './IncludedInPrice';
import { Step3Props } from './types';
import { useState } from 'react';
import ConfirmDialog from 'src/components/confirm-dialog';
import CompleteRegistration from './CompleteRegistration';

const INCLUDED_IN_PROCE = [
  'Access the My Journey Education Library',
  'Read and download treatment Fact Sheets',
  'Watch and learn videos about you treatment and procedures',
  'Navigate and electronically sign the clinics consent forms',
];

type FormValuesProps = {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export default function RegisterStep3({ setCurrentStep, refetch }: Step3Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const defaultValues = {
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const onSubmit = (data: any) => {
    handleOpen();
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ px: 4, py: 5, height: '100%' }}>
            <Typography variant="overline" color="primary.dark" sx={{ mb: 2 }}>
              Subscription
            </Typography>
            <Stack direction="row" alignItems="baseline" sx={{ mb: 5 }}>
              <Typography variant="h2" sx={{ fontWeight: 'fontWeightBold' }}>
                R99
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                / once off
              </Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
              {INCLUDED_IN_PROCE.map((title) => (
                <IncludedInPrice key={title} title={title} />
              ))}
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ px: 4, py: 5, height: '100%' }}>
            <Typography variant="h5">Payment Details</Typography>
            <FormProvider methods={methods}>
              <Grid container sx={{ pt: 3 }} spacing={3}>
                <Grid item xs={12}>
                  <RHFTextField name="nameOnCard" label="Name on card" />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="cardNumber" label="Card number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="expiry" label="Expiry (MM/YY)" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="cvv" label="CVV" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    size={'large'}
                  >
                    Pay Now
                  </Button>
                </Grid>
              </Grid>
            </FormProvider>
          </Card>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-start" sx={{ width: '100%' }}>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentStep(1);
            refetch();
          }}
          size={'large'}
          sx={{ mt: 3 }}
        >
          Back
        </Button>
      </Stack>
      <ConfirmDialog
        open={isOpenDialog}
        content={<CompleteRegistration onClose={handleClose} />}
        hideCloseBtn={true}
        sx={{
          '& .MuiDialogContent-root': {
            paddingTop: '8px !important',
          },
          '& .MuiPaper-root': {
            maxWidth: 528,
            padding: '28px 24px 56px',
            '& .MuiDialogContent-root': {
              padding: 0,
            },
          },
        }}
      />
    </>
  );
}
