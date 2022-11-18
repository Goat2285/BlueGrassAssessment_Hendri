import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, Stack } from "@mui/material";
import FormProvider, { RHFTextField, RHFSelect, RHFDatePicker, RHFCheckbox } from '../../components/hook-form';
import { Step2Props } from './types';
import { useEffect } from 'react';
const southAfricanIdInfo = require('south-african-id-info')

type FormValuesProps = {
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: string;
  nationality: string;
  idnumber: number;
  address: string;
  dateofbirth: string;
  afterSubmit?: string;
  hasnopartner: boolean;
};

export default function RegisterStep2({ setCurrentStep } : Step2Props){
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;
  const maxDate = new Date();

  const Step2Schema = Yup.object().shape({
    hasnopartner: Yup.boolean(),
    firstname: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string().required('First name is required') } ),
    lastname: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string().required('Last name is required') } ),
    email: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string().email('Email must be a valid email address').required('Email is required') } ),
    contactnumber: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string().trim().matches(phoneRegex, "Please use the following format: +27 72 000 0000").required('Contact number is required') } ),
    nationality: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string().required('Nationality is required') } ),
    idnumber: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string()
      .when('nationality', {
        is: 'South African',
        then: Yup.string().test('validator-custom-name', (value, { createError, path }) => {
          if (value && southAfricanIdInfo(value).valid === false) return createError({
            path,
            message: "Please neter a valid SA ID number",
          })
          else return true;
        }).required('ID or Passport number is required'),
        otherwise: Yup.string().required('ID or Passport number is required'),
      }) } ),
    address: Yup.string().when("hasnopartner", { is: true, otherwise: Yup.string().required('Address is required') } ),
    dateofbirth: Yup.date().when("hasnopartner", { is: true, then: Yup.date().nullable(true) ,otherwise: Yup.date().required('Date of birth is required').max(maxDate, 'Date of birth needs to be in the past').nullable(true) } ),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Step2Schema)
  });

  const {
    handleSubmit,
    clearErrors,
    watch,
    resetField
  } = methods;

  const hasPartnerWatcher = watch("hasnopartner", false);
  useEffect(()=>{
    if (hasPartnerWatcher) {
      clearErrors()
    }
  },[clearErrors, hasPartnerWatcher, resetField])

  const onSubmit = (data: FormValuesProps) => {
    setCurrentStep(2)
  };

  const prevStepHandler = () => {
    setCurrentStep(0)
  }

  return (
    <Stack direction={'column'} alignItems='stetch' sx={{ width: '100%', maxWidth: 944 }}>     
        <FormProvider methods={methods}>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFTextField name="firstname" label="First Name" sx={{ maxWidth: 448, margin: '12px !important' }} disabled={hasPartnerWatcher} />            
            <RHFTextField name="lastname" label="Last Name" sx={{ maxWidth: 448,  margin: '12px !important' }} disabled={hasPartnerWatcher}/>
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFTextField name="email" label="Email" sx={{ maxWidth: 448, margin: '12px !important' }} disabled={hasPartnerWatcher}/>            
            <RHFTextField name="contactnumber" label="Contact Number" sx={{ maxWidth: 448,  margin: '12px !important' }} disabled={hasPartnerWatcher}/>
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFSelect name="nationality" label="Nationality" sx={{ maxWidth: 448, margin: '12px !important' }} variant={'outlined'} disabled={hasPartnerWatcher}>
              <option />
              <option value={'South African'}>
                South African
              </option>
              <option value={'Zimbabwean'}>
                Zimbabwean
              </option>
            </RHFSelect>
            <RHFTextField name="idnumber" label="ID / Passport Number" sx={{ maxWidth: 448,  margin: '12px !important' }} disabled={hasPartnerWatcher}/>
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFTextField name="address" label="Address" sx={{ maxWidth: 448, margin: '12px !important' }} disabled={hasPartnerWatcher}/>            
            <RHFDatePicker name="dateofbirth" label="Date of Birth" sx={{ maxWidth: 448,  margin: '12px !important' }} disabled={hasPartnerWatcher}/>   
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFCheckbox name="hasnopartner" label="I have no partner" sx={{ maxWidth: 448, margin: '12px !important', width: '100%'  }} /> 
            <Box sx={{ maxWidth: 448, margin: '12px !important', width: '100%' }} />  
          </Stack>         
      </FormProvider>
      
      <Box m={2} />
      <Stack direction={'row'} justifyContent={'flex-end'} m={1}>
        <Button 
          variant="text"
          onClick={()=>{
            prevStepHandler();
          }}
          size={'large'}
        >
          Back
        </Button>
        <Box m={1} />
        <Button 
          variant="contained" 
          onClick={handleSubmit(onSubmit)}
          size={'large'}
        >
          Next
        </Button>
      </Stack>      
    </Stack>
  )
}
