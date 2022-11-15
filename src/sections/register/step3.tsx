import { Typography, Button, Box, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { Step1Props } from './types';

export default function RegisterStep3({ setCurrentStep } : Step1Props){
  const navigate = useNavigate();
  const nextStepHandler = () => {
    setCurrentStep(1)
  }

  return (
    <Stack direction={'column'}>
      <Stack direction={'row'} flexWrap={'wrap'}>
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}
        {/* <RHFTextField 
          name="firstname" 
          label="First Name" 
          handleSubmit={handleSubmit} 
          onSubmit={onSubmit} 
          methods={methods} 
          errors={errors} 
          isSubmitting={isSubmitting} 
          isSubmitSuccessful={isSubmitSuccessful}         
        />
        <RHFTextField name="lastname" label="Last Name" />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="contactnumber" label="Contact Number" />
        <RHFSelect name="nationality" label="Nationality" variant="outlined"> 
          <Button>South African</Button>
        </RHFSelect>
        <RHFTextField name="idnumber" label="ID / Passport Number" />
        <RHFTextField name="address" label="Address" />
        <RHFTextField name="dateofbirth" label="Date of Birth" />  */}
      </Stack>
      <Box m={2} />
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Button 
          variant="text"
          onClick={()=>{
            navigate('/welcome');
          }}
          size={'large'}
        >
            Back
        </Button>
        <Box m={1} />
        <Button 
          variant="contained" 
          onClick={nextStepHandler}
          size={'large'}
        >
          Next
        </Button>
      </Stack>      
    </Stack>
  )
}