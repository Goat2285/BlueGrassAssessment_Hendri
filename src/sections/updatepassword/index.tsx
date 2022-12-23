import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useMemo } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import { useUpdatePasswordWithToken } from '../../hooks/api/auth/useUpdatePasswordWithToken';
import { parseAxiosError } from 'src/utils/parseAxiosError';

const PASSWORDREGEX = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])\w+/g;

export default function UpdatePassword() {
  const getURLValues = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('t')?.replace(/ /g, '+');
    const member = params.get('m')?.replace(/ /g, '+');

    if (!token || !member) {
      return {
        userId: 'Unknown',
        token: 'Unknown',
      };
    }

    return {
      userId: member,
      token: token,
    };
  };

  const userDetails = useMemo(() => getURLValues(), []);

  type FormValuesProps = {
    password: string;
    confirmPassword: string;
    afterSubmit?: string;
  };

  const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(
        PASSWORDREGEX,
        'Password must contain atleast one lowercase, one uppercase, one number and a special character'
      )
      .min(8, 'Please enter a password that is atleast 8 characters long'),
    confirmpassword: Yup.string()
      .required('Password confirm is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .min(8, 'Please use a password that is longer than 8 characters'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdatePasswordSchema),
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const values = watch();
  const { isError, isSuccess, error, refetch, isFetching } = useUpdatePasswordWithToken({
    ...values,
    userId: userDetails.userId,
    token: userDetails.token,
  });

  console.log(error);

  const onSubmit = async () => {
    try {
      refetch();
      if (isError) {
        const errors = parseAxiosError(error);
        console.log('a', errors);
        if (errors?.length > 0) {
          console.log(errors);
          setError('afterSubmit', {
            message: errors.join(' '),
          });
        }
      }
    } catch (error) {
      reset();
      setError('afterSubmit', {
        message: 'An error has occured while submitting please try again',
      });
    }
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 480,
      }}
    >
      {isSuccess ? (
        <Step2 />
      ) : (
        <Step1
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isFetching}
          methods={methods}
        />
      )}
    </Stack>
  );
}
