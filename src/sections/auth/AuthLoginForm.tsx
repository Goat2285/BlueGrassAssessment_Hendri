import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField, RHFCheckbox } from '../../components/hook-form';

// ----------------------------------------------------------------------

import { useNavigate } from 'react-router-dom';

type FormValuesProps = {
  email: string;
  password: string;
  rememberMe?: boolean;
  redirectUrl?: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema)
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password, data.rememberMe = false, data.redirectUrl = './');
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  const tempSubmitSim = () => {
    navigate('/');
  }

  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <FormProvider methods={methods} onSubmit={handleSubmit(tempSubmitSim)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} color={'text.disabled'} width={25} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack justifyContent="space-between" sx={{ my: 2 }} direction='row' alignItems='center'>
        <RHFCheckbox name={'rememberMe'} label={'Remember me'} sx={{paddingLeft: '10px'}} />
        <Link variant="body2" color="inherit" underline='hover'  sx={{ cursor: "pointer", color: 'primary.dark', fontWeight: 'bold' }}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'primary.main',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'primary.light',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Sign in
      </LoadingButton>


      <Button variant="text" onClick={()=>{
        navigate('/auth/disabled');
      }}>Go to Disabled screen</Button>
      <Button variant="text" onClick={()=>{
        navigate('/auth/forgotpassword');
      }}>Go to forgotpassword screen</Button>
      <Button variant="text" onClick={()=>{
        navigate('/auth/updatepassword');
      }}>Go to updatepassword screen</Button>
    </FormProvider>
  );
}
