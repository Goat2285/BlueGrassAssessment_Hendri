import * as Yup from 'yup';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Card, Typography, Stack, Box } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import { usePostUpdatePassword } from 'src/hooks/api/auth/usePostUpdatePassword';

type FormValuesProps = {
  password: string;
  confirmPassword: string;
};

export default function Security() {
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Please use a password that is minimum 8 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
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

  const { mutate: postSubmit } = usePostUpdatePassword({
    onSuccess: () => {
      reset();
      enqueueSnackbar('Password has been updated!');
    },
    onError: () => {
      enqueueSnackbar('Error, password not updated!', { variant: 'error' });
    },
  });

  const onSubmit = async (data: FormValuesProps) => {
    postSubmit(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Security</Typography>
            <Stack spacing={3} sx={{ pt: 3, mb: 3 }}>
              <RHFTextField
                name="password"
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

              <RHFTextField name="confirmPassword" type="password" label="Confirm New Password" />
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
