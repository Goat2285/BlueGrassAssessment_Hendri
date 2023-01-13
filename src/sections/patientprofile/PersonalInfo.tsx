import * as Yup from 'yup';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFDatePicker, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { usePutPatientPersonalDetails } from 'src/hooks/api/patients/usePutPatientPersonalDetails';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useNavigate } from 'react-router';
const southAfricanIdInfo = require('south-african-id-info');

type FormValuesProps = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  nationality: string;
  idOrPassport: string;
  address: string;
  //dateOfBirth: string;
};

type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  nationality?: string;
  idOrPassport?: string;
  address?: string;
  dateOfBirth?: string;
  refetch: () => void;
};

export default function PersonalInfo({
  firstName,
  lastName,
  email,
  contactNumber,
  nationality,
  idOrPassport,
  address,
  dateOfBirth,
  refetch,
}: Props) {
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;
  const maxDate = new Date();

  const { enqueueSnackbar } = useSnackbar();

  const { initialize } = useAuthContext();

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
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
              message: 'Please enter a valid SA ID number',
            });
          else return true;
        })
        .required('ID or Passport number is required'),
      otherwise: Yup.string().required('ID or Passport number is required'),
    }),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.mixed().when('hasnopartner', {
      is: true,
      then: Yup.string().nullable(true),
      otherwise: Yup.date()
        .required('Date of birth is required')
        .max(maxDate, 'Date of birth needs to be in the past')
        .nullable(true),
    }),
  });

  const { mutate: postSubmit } = usePutPatientPersonalDetails({
    onSuccess: (data) => {
      console.log(data);

      if (data.isMailChanged) {
        localStorage.setItem('verification', JSON.stringify(data.email));
        navigate('/verification');
      } else {
        enqueueSnackbar('Personal details has been added!');
        refetch();
        initialize();
      }
    },
    onError: () => {
      enqueueSnackbar('Error, personal details not added!', { variant: 'error' });
    },
  });

  const defaultValues = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    contactNumber: contactNumber || '',
    nationality: nationality || '',
    idOrPassport: idOrPassport || '',
    address: address || '',
    //dateOfBirth: dateOfBirth || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    postSubmit(data);
  };

  return (
    <Stack>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6">Partner 1 Details</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ pt: 3, mb: 3 }}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="firstName" label="First Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="lastName" label="Last Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email" label="Email" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="contactNumber" label="Contact Number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect name="nationality" label="Nationality" variant={'outlined'}>
                <option />
                <option value={'South African'}>South African</option>
                <option value={'Zimbabwean'}>Zimbabwean</option>
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="idOrPassport" label="ID / Passport Number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="address" label="Address" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDatePicker name="dateOfBirth" label="Date of Birth" />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
              sx={{
                display: { xs: 'flex', md: 'inline-flex' },
                width: { xs: '100%', md: 'fit-content' },
              }}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </FormProvider>
      </Card>
    </Stack>
  );
}
