import { Stack, Typography, Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { GREYS } from '../../theme/palette';
import StepperSteps from './stepData';
import RegistrationStepper from '../../components/stepper/stepper';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import { useGetPatientInfo } from 'src/hooks/api/auth/useGetPatientInfo';
import LoadingScreen from 'src/components/loading-screen';
import { useQueryClient } from '@tanstack/react-query';

export default function Register() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const queryClient = useQueryClient();

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
  const { data: patientInfo, isLoading } = useGetPatientInfo({
    memberKey: userDetails.userId,
    token: userDetails.token,
  });

  const refetch = () => {
    queryClient.refetchQueries(['getPatientInfo']);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        py: '100px',
      }}
    >
      {StepperSteps[currentStep].tickLabel || StepperSteps[currentStep].headerTitle ? (
        <>
          <Typography
            variant="h3"
            dangerouslySetInnerHTML={{
              __html: StepperSteps[currentStep].headerTitle
                ? StepperSteps[currentStep].headerTitle
                : StepperSteps[currentStep].tickLabel,
            }}
          />
          <Box m={1} />
        </>
      ) : null}
      {StepperSteps[currentStep].headerDescription ? (
        <>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: GREYS.grey3 }}
            dangerouslySetInnerHTML={{ __html: StepperSteps[currentStep].headerDescription }}
          />
          <Box m={2} />
        </>
      ) : null}
      <RegistrationStepper currentStep={currentStep} steps={StepperSteps} />
      <Box m={2} />
      {currentStep === 0 ? (
        <Step1
          setCurrentStep={setCurrentStep}
          firstName={patientInfo?.firstName}
          lastName={patientInfo?.lastName}
          email={patientInfo?.email}
          contactNumber={patientInfo?.contactNumber}
          nationality={patientInfo?.nationality}
          idOrPassport={patientInfo?.idOrPassport}
          address={patientInfo?.address}
          dateOfBirth={patientInfo?.dateOfBirth}
          memberKey={userDetails.userId}
          token={userDetails.token}
          refetch={refetch}
        />
      ) : null}
      {currentStep === 1 ? (
        <Step2
          setCurrentStep={setCurrentStep}
          firstName={patientInfo?.partnerFirstName}
          lastName={patientInfo?.partnerLastName}
          email={patientInfo?.partnerEmail}
          contactNumber={patientInfo?.partnerContactNumber}
          nationality={patientInfo?.partnerNationality}
          idOrPassport={patientInfo?.partnerIdOrPassport}
          address={patientInfo?.partnerAddress}
          dateOfBirth={patientInfo?.partnerDateOfBirth}
          memberKey={userDetails.userId}
          token={userDetails.token}
          refetch={refetch}
        />
      ) : null}
      {currentStep === 2 ? <Step3 setCurrentStep={setCurrentStep} refetch={refetch} /> : null}
    </Stack>
  );
}
