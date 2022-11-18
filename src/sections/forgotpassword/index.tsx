import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from "@mui/material";
import { useState } from "react";
import Step1 from './step1';
import Step2 from './step2';


export default function ForgotPassword() {
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false)

  type FormValuesProps = {
    email: string;
    afterSubmit?: string;
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ForgotPasswordSchema)
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
      setEmailIsSent(true)
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
      { emailIsSent ? 
        <Step2 
          onSubmit={onSubmit} 
          handleSubmit={handleSubmit} 
          errors={errors} 
          isSubmitting={isSubmitting} 
          isSubmitSuccessful={isSubmitSuccessful} 
          methods={methods}
        />
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

