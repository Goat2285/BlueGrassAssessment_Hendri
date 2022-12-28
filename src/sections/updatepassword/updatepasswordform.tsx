// @mui
import { Stack, Alert, IconButton, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useState } from 'react';
import Iconify from '../../components/iconify';

export type UpdatepasswordformProps = {
  handleSubmit: any;
  onSubmit: any;
  methods: any;
  errors: any;
  isSubmitting: boolean;
};

export default function ForgotpasswordForm({
  handleSubmit,
  onSubmit,
  methods,
  errors,
  isSubmitting,
}: UpdatepasswordformProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      color={'text.disabled'}
                      width={25}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Box m={3} />
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField
            name="confirmpassword"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      color={'text.disabled'}
                      width={25}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
          Update Password
        </LoadingButton>
        <Box m={1} />
      </FormProvider>
    </Box>
  );
}
