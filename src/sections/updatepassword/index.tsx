import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from "@mui/material";
import { useState } from "react";
import Step1 from './step1';
import Step2 from './step2';

export default function UpdatePassword() {
  const [passwordIsUpdated, setPasswordIsUpdated] = useState<boolean>(false)

  type FormValuesProps = {
    email: string;
    confirmemail: string;
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
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log(data)
      // Leaving this here for now until API is set up
      setPasswordIsUpdated(true)
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
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
          isSubmitting={isSubmitting} 
          isSubmitSuccessful={isSubmitSuccessful} 
          methods={methods}
        /> 
      }
    </Stack>
  );
}

