// @mui
import { Stack, Alert, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider, { RHFTextField } from '../../components/hook-form';

export type ForgotpasswordFormProps = {
  handleSubmit?: any;
  onSubmit?: any;
  methods?: any;
  errors?: any;
  isSubmitting?: boolean;
};

export default function ForgotpasswordForm({ handleSubmit, onSubmit, methods, errors, isSubmitting }: ForgotpasswordFormProps) {

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <RHFTextField name="email" label="Email address" />
          </Stack>
          <Box m={3} />
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'primary.light',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Send
          </LoadingButton>
          <Box m={1} />
      </FormProvider>
    </Box>
  );
}
