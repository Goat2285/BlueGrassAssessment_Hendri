import * as Yup from 'yup';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Card, Typography, Stack, Box } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';

type FormValuesProps = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function Security() {
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Please use a password that is minimum 8 characters'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Security</Typography>
            <Stack spacing={3} sx={{ pt: 3, mb: 3 }}>
              <RHFTextField
                name="newPassword"
                type="password"
                label="New Password"
                helperText={
                  <Stack
                    component="span"
                    direction="row"
                    alignItems="center"
                    color="primary.dark"
                    fontWeight="500"
                  >
                    <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be a
                    minimum of 8 characters
                  </Stack>
                }
              />

              <RHFTextField
                name="confirmNewPassword"
                type="password"
                label="Confirm New Password"
              />
            </Stack>
            <Box sx={{ textAlign: 'end' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{
                  display: { xs: 'flex', md: 'inline-flex' },
                  width: { xs: '100%', md: 'fit-content' },
                }}
              >
                Save Changes
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
