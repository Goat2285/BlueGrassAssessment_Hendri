import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormProvider, { RHFTextField, RHFSelect, RHFDatePicker } from '../../components/hook-form';
import { Step1Props } from './types';
import { useSnackbar } from '../../components/snackbar';
import { usePostPersonalDetails } from 'src/hooks/api/auth/usePostPersonalDetails';
const southAfricanIdInfo = require('south-african-id-info');

type FormValuesProps = {
  memberKey: string;
  token: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  nationality: string;
  idOrPassport: string;
  address: string;
  dateOfBirth: string;
  afterSubmit?: string;
};

export default function RegisterStep1({
  setCurrentStep,
  firstName,
  lastName,
  email,
  contactNumber,
  nationality,
  idOrPassport,
  address,
  dateOfBirth,
  memberKey,
  token,
  refetch,
}: Step1Props) {
  const navigate = useNavigate();
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;
  const maxDate = new Date();

  const Step1Schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    contactNumber: Yup.string()
      .trim()
      .matches(phoneRegex, 'Please use the following format: +27 72 000 0000')
      .required('Contact number is required'),
    nationality: Yup.string().required('Nationality is required'),
    idOrPassport: Yup.string().when('nationality', {
      is: 'South African',
      then: Yup.string()
        .test('validator-custom-name', (value, { createError, path }) => {
          if (value && southAfricanIdInfo(value).valid === false)
            return createError({
              path,
              message: 'Please neter a valid SA ID number',
            });
          else return true;
        })
        .required('ID or Passport number is required'),
      otherwise: Yup.string().required('ID or Passport number is required'),
    }),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(maxDate, 'Date of birth needs to be in the past')
      .nullable(true),
  });

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: postSubmit } = usePostPersonalDetails({
    onSuccess: () => {
      enqueueSnackbar('Personal details has been added!');
      refetch();
      setCurrentStep(1);
    },
    onError: () => {
      enqueueSnackbar('Error, personal details not added!', { variant: 'error' });
    },
  });

  const defaultValues = {
    firstName,
    lastName,
    email,
    contactNumber,
    nationality,
    idOrPassport,
    address,
    dateOfBirth: idOrPassport ? dateOfBirth : '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Step1Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValuesProps) => {
    const postData = Object.assign(data, {
      memberKey,
      token,
      dateOfBirth: new Date(data.dateOfBirth).toISOString().substring(0, 10),
    });
    postSubmit(postData);
  };

  return (
    <Stack direction={'column'} alignItems="stetch" sx={{ width: '100%', maxWidth: 944 }}>
      <FormProvider methods={methods}>
        <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent="center">
          <RHFTextField
            name="firstName"
            label="First Name"
            sx={{ maxWidth: 448, margin: '12px !important' }}
          />
          <RHFTextField
            name="lastName"
            label="Last Name"
            sx={{ maxWidth: 448, margin: '12px !important' }}
          />
        </Stack>
        <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent="center">
          {/*<RHFTextField*/}
          {/*  name="email"*/}
          {/*  label="Email"*/}
          {/*  sx={{ maxWidth: 448, margin: '12px !important' }}*/}
          {/*  disabled*/}
          {/*/>*/}
          <RHFTextField
            name="contactNumber"
            label="Contact Number"
            sx={{ maxWidth: 448, margin: '12px !important' }}
          />
        </Stack>
        <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent="center">
          <RHFSelect
            name="nationality"
            label="Nationality"
            sx={{ maxWidth: 448, margin: '12px !important' }}
            variant={'outlined'}
          >
            <option />
            <option value={'South African'}>South African</option>
            <option value={'Zimbabwean'}>Zimbabwean</option>
          </RHFSelect>
          <RHFTextField
            name="idOrPassport"
            label="ID / Passport Number"
            sx={{ maxWidth: 448, margin: '12px !important' }}
          />
        </Stack>
        <Stack spacing={3} direction={'row'} flexWrap={'wrap'} justifyContent="center">
          <RHFTextField
            name="address"
            label="Address"
            sx={{ maxWidth: 448, margin: '12px !important' }}
          />
          <RHFDatePicker
            name="dateOfBirth"
            label="Date of Birth"
            sx={{ maxWidth: 448, margin: '12px !important' }}
          />
        </Stack>
      </FormProvider>

      <Box m={2} />
      <Stack direction={'row'} justifyContent={'flex-end'} m={1}>
        <Button
          variant="text"
          onClick={() => {
            navigate(-1);
          }}
          size={'large'}
        >
          Back
        </Button>
        <Box m={1} />
        <Button variant="contained" onClick={handleSubmit(onSubmit)} size={'large'}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
