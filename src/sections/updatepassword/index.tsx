import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from "@mui/material";
import { useState } from "react";
import Step1 from './step1';
import Step2 from './step2';
import { useUpdatePasswordWithToken } from '../../hooks/api/auth/useUpdatePasswordWithToken';
import { parseAxiosError } from 'src/utils/parseAxiosError';

export default function UpdatePassword() {
  const [passwordIsUpdated, setPasswordIsUpdated] = useState<boolean>(false)

  type FormValuesProps = {
    password: string;
    confirmPassword: string;
    afterSubmit?: string;
  };

  const  UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(5, "Please use a password that is longer than 5 characters"),
    confirmpassword: Yup.string().required('Password confirm is required').oneOf([Yup.ref('password'), null], 'Passwords must match').min(5, "Please use a password that is longer than 5 characters"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdatePasswordSchema)
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
  const { isError, isSuccess, data, error, refetch, isFetching } = useUpdatePasswordWithToken({ ...values, userId: '123', token: "string" });

  const onSubmit = async () => {
    setPasswordIsUpdated(true)
    //try {
    //   refetch();
    //   if (isError) {
    //     const  errors  = parseAxiosError(error);
    //     console.log('a', errors)
    //     if (errors?.length > 0) {
    //       console.log(errors)
    //       setError('afterSubmit', {
    //         message: errors.join(' '),
    //       });
    //     }
    //   }
    // } catch (error) {
    //   reset();
    //   setError('afterSubmit', {
    //       message: "An error has occured while submitting please try again",
    //     });
    //}
  };

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 480 
    }}>
      { passwordIsUpdated ? 
        <Step2 />
      : 
        <Step1 
          onSubmit={onSubmit} 
          handleSubmit={handleSubmit} 
          errors={errors} 
          isSubmitting={isFetching} 
          methods={methods}
        /> 
      }
    </Stack>
  );
}

