import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ConfirmDialog from 'src/components/confirm-dialog';
import TransferPatientModal from './TransferPatientModal';
import { useState } from 'react';

type FormValuesProps = {
  clinic: string;
};

type Props = {
  clinic: string;
};

const ClinicInfo = ({ clinic }: Props) => {
  const [dialogTitle, setDialogTitle] = useState('Search Clinics');
  const [openDialog, setOpenDialog] = useState(false);

  const schema = Yup.object().shape({
    clinic: Yup.string().required('Clinic is required'),
  });

  const defaultValues = {
    clinic,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setDialogTitle('Search Clinics');
    setOpenDialog(true);
  };

  const handleChangeDialogTitle = (title: string) => {
    setDialogTitle(title);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Stack>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">Registered Clinic</Typography>
              <FormProvider methods={methods}>
                <Grid container spacing={3} sx={{ pt: 4, mb: 3 }}>
                  <Grid item xs={12}>
                    <RHFTextField name="clinic" label="Clinic" disabled />
                  </Grid>
                </Grid>
              </FormProvider>
              <Box sx={{ textAlign: 'end' }}>
                <Button variant="outlined" size="large" sx={{ mr: 3 }}>
                  Add Clinic
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    display: { xs: 'flex', md: 'inline-flex' },
                    width: { xs: '100%', md: 'fit-content' },
                  }}
                  onClick={handleOpenDialog}
                >
                  Transfer Clinics
                </Button>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialogContent-root': {
            paddingTop: '8px !important',
          },
          '& .MuiPaper-root': {
            maxWidth: dialogTitle === 'Search Clinics' ? 760 : 440,
          },
        }}
        title={dialogTitle}
        content={
          <TransferPatientModal
            closeDialog={handleCloseDialog}
            changeDialogTitle={(title) => handleChangeDialogTitle(title)}
          />
        }
      />
    </>
  );
};

export default ClinicInfo;
