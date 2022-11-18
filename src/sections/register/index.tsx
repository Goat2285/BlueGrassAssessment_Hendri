import { Stack, Typography, Box } from "@mui/material";
import { useState } from "react";
import { GREYS } from '../../theme/palette';
import StepperSteps from './stepData';
import FormProvider from '../../components/hook-form';
import RegistrationStepper from '../../components/stepper/stepper';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValuesProps } from './types';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

export default function Register() {
  const [currentStep, setCurrentStep] = useState<number>(0)


  // const onSubmit = async (data: FormValuesProps) => {
  //   try {
  //     console.log(data)
  //     // Leaving this here for now until API is set up
  //   } catch (error) {
  //     reset();
  //     setError('afterSubmit', {
  //       ...error,
  //       message: error.message,
  //     });
  //   }
  // };

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      py: '100px'
    }}>      
      {
        StepperSteps[currentStep].tickLabel || StepperSteps[currentStep].headerTitle
        ? 
        <>
          <Typography variant="h3" dangerouslySetInnerHTML={{ __html: StepperSteps[currentStep].headerTitle ? StepperSteps[currentStep].headerTitle : StepperSteps[currentStep].tickLabel }} /> 
          <Box m={1} />
        </>
        : 
          null 
      }
      {
        StepperSteps[currentStep].headerDescription 
        ? 
          <>
            <Typography variant="body1" sx={{ textAlign: 'center', color: GREYS.grey3 }} dangerouslySetInnerHTML={{ __html: StepperSteps[currentStep].headerDescription }} /> 
            <Box m={2} />
          </>
        : 
          null 
      }
      <RegistrationStepper currentStep={currentStep} steps={StepperSteps} />     
      <Box m={2}/>
      {
        currentStep === 0 
        ? 
          <Step1 
            setCurrentStep={setCurrentStep} 
          />
        : null
      }
      {
        currentStep === 1 
        ? 
          <Step2 
            setCurrentStep={setCurrentStep} 
          />
        : null
      }
      {
        currentStep === 2 
        ? 
          <Step2 
            setCurrentStep={setCurrentStep} 
          />
        : null
      }       
    </Stack>
  );
}
