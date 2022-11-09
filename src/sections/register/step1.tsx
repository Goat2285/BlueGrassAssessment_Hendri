import {useEffect} from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import FormProvider, { RHFTextField, RHFSelect } from '../../components/hook-form';
import { Step1Props } from './types';
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
};

export default function RegisterStep1({ setCurrentStep } : Step1Props){
  const navigate = useNavigate();

  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;

  const Step1Schema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    contactnumber: Yup.string().trim().matches(phoneRegex, "Please use the following format: +27 72 000 0000").required('Contact number is required'),
    nationality: Yup.string().required('Nationality is required'),
    idnumber: Yup.string()
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
      }),
    address: Yup.string().required('Address is required'),
    dateofbirth: Yup.string().required('Date of birth is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Step1Schema)
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data: FormValuesProps) => {
    setCurrentStep(1)
  };

  return (
    <Stack direction={'column'} alignItems='stetch' sx={{ width: '100%', maxWidth: 944 }}>     
        <FormProvider methods={methods}>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFTextField name="firstname" label="First Name" sx={{ maxWidth: 448, margin: '12px !important' }} />            
            <RHFTextField name="lastname" label="Last Name" sx={{ maxWidth: 448,  margin: '12px !important' }} />
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFTextField name="email" label="Email" sx={{ maxWidth: 448, margin: '12px !important' }} />            
            <RHFTextField name="contactnumber" label="Contact Number" sx={{ maxWidth: 448,  margin: '12px !important' }} />
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFSelect name="nationality" label="Nationality" sx={{ maxWidth: 448, margin: '12px !important' }} variant={'outlined'}>
              <option />
              <option value={'South African'}>
                South African
              </option>
              <option value={'Zimbabwean'}>
                Zimbabwean
              </option>
            </RHFSelect>
            <RHFTextField name="idnumber" label="ID / Passport Number" sx={{ maxWidth: 448,  margin: '12px !important' }} />
          </Stack>
          <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent='center'>            
            <RHFTextField name="address" label="Address" sx={{ maxWidth: 448, margin: '12px !important' }} />            
            <RHFTextField name="dateofbirth" label="Date of Birth" sx={{ maxWidth: 448,  margin: '12px !important' }} />
          </Stack>
      </FormProvider>
      
      <Box m={2} />
      <Stack direction={'row'} justifyContent={'space-between'} m={1}>
        <Button 
          variant="outlined"
          onClick={()=>{
            navigate('/welcome');
          }}
          size={'large'}
        >
          Back
          </Button>
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