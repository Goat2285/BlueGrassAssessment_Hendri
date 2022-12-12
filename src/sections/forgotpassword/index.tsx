import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import Step1 from './step1';
import Step2 from './step2';
import { useForgotPassword } from '../../hooks/api/auth/useForgotPassword';
import { parseAxiosError } from 'src/utils/parseAxiosError';

export default function ForgotPassword() {
  type FormValuesProps = {
    email: string;
    afterSubmit?: string;
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const values = watch();
  // redirectUrl needs to be removed
  const { isError, isSuccess, data, error, refetch, isFetching } = useForgotPassword({
    ...values,
    resetUrl: `${process.env.REACT_APP_HOST_API_KEY}/auth/updatepassword`,
  });

  const onSubmit = async () => {
    try {
      refetch();
      if (isError) {
        const errors = parseAxiosError(error);
        if (errors?.length > 0) {
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
        <Step2 onSubmit={onSubmit} />
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
