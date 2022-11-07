import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from "@mui/material";
import { useState } from "react";
import RegistrationStepper from '../../components/stepper/stepper';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

export default function UpdatePassword() {
  const [currentStep, setCurrentStep] = useState<number>(0)

  type FormValuesProps = {
    partner1 : {
      firstname: string;
      lastname: string;
      email: string;
      contactnumber: number;
      nationality: string;
      idnumber: number;
      address: string;
      dateofbirth: string;
    },
    haspartner: boolean,
    partner2 : {
      firstname: string;
      lastname: string;
      email: string;
      contactnumber: number;
      nationality: string;
      idnumber: number;
      address: string;
      dateofbirth: string;
    },
    nameoncard: string;
    cardnumber: number;
    expirydate: string;
    cvv: number;
    afterSubmit?: string;
  };

  const  UpdatePasswordSchema = Yup.object().shape({
    
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
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  const StepperSteps = [
    {
      step: 0,
      label: 'Partner 1 - Information',
      key: 'registrationStep1'
    },
    {
      step: 1,
      label: 'Partner 2 -  Information',
      key: 'registrationStep2'
    },
    {
      step: 2,
      label: 'Payment Information',
      key: 'registrationStep3'
    }
  ]


  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
    }}>
      <RegistrationStepper currentStep={currentStep} steps={StepperSteps} />
      {currentStep === 0 ? <Step1 /> : null}
      {currentStep === 1 ? <Step2 /> : null}
      {currentStep === 2 ? <Step3 /> : null}
    </Stack>
  );
}

