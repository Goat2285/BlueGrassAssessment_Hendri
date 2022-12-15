import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField, RHFCheckbox } from '../../components/hook-form';

import { useAuthContext } from '../../auth/useAuthContext';
import { useLogin } from '../../hooks/api/auth/useLogin';

import { useNavigate } from 'react-router-dom';
import { parseAxiosError } from 'src/utils/parseAxiosError';

type FormValuesProps = {
  username: string;
  password: string;
  rememberMe: boolean;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
    rememberMe: false,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const values = watch();

  const { isError, isSuccess, data, error, refetch, isFetching } = useLogin(values);

  useEffect(() => {
    if (isError && error) {
      const errors = parseAxiosError(error);
      if (errors?.length > 0) {
        if (errors[0]?.toString() === 'Member is locked out') {
          reset();
          navigate('/auth/disabled');
        }
        setError('afterSubmit', {
          message: errors.join(' '),
        });
      } else {
        if (isError) {
          setError('afterSubmit', {
            message: 'An error has occured while submitting please try again',
          });
        }
      }
    } else if (isError) {
      setError('afterSubmit', {
        message: 'An error has occured while submitting please try again',
      });
    }
  }, [isError, error, navigate, reset, setError]);

  useEffect(() => {
    if (isSuccess) {
      login({ user: data.data });

      if (data.data.roles[0] === 'SuperAdmin') {
        navigate('/superadmin/dashboard');
      } else if (
        data.data.roles[0] === 'Admin' ||
        data.data.roles[0] === 'Doctor' ||
        data.data.roles[0] === 'Staff'
      ) {
        navigate('/dashboard');
      } else if (data.data.roles[0] === 'Patient') {
        navigate('/patient/dashboard');
      }
    }
  }, [isSuccess, data?.data, login, navigate]);

  const onSubmit = async (data: FormValuesProps) => {
    refetch();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="username" label="Email address" />

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

      <Stack justifyContent="space-between" sx={{ my: 2 }} direction="row" alignItems="center">
        <RHFCheckbox name={'rememberMe'} label={'Remember me'} sx={{ paddingLeft: '10px' }} />
        <Link
          variant="body2"
          color="inherit"
          underline="hover"
          sx={{ cursor: 'pointer', color: 'primary.dark', fontWeight: 'bold' }}
          href={'/auth/forgotpassword'}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isFetching}
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

      <Button
        onClick={() => {
          navigate('/auth/updatepassword');
        }}
      >
        Navigate to Update Password screen
      </Button>

      <Button
        onClick={() => {
          navigate('/welcome');
        }}
      >
        Navigate to Welcome screen
      </Button>
    </FormProvider>
  );
}
