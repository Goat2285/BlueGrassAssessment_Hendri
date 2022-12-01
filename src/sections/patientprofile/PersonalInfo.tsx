import * as Yup from 'yup';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/useAuthContext';
import FormProvider, { RHFDatePicker, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
const southAfricanIdInfo = require('south-african-id-info');

type FormValuesProps = {
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: string;
  nationality: string;
  idnumber: number;
  address: string;
  dateofbirth: string;
};

export default function PersonalInfo() {
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;
  const maxDate = new Date();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const schema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    contactnumber: Yup.string()
      .trim()
      .matches(phoneRegex, 'Please use the following format: +27 72 000 0000')
      .required('Contact number is required'),
    nationality: Yup.string().required('Nationality is required'),
    idnumber: Yup.string().when('nationality', {
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
    dateofbirth: Yup.date()
      .required('Date of birth is required')
      .max(maxDate, 'Date of birth needs to be in the past')
      .nullable(true),
  });

  // After we implement auth remove dummy data

  const defaultValues = {
    firstname: user?.firstname || 'Tracy',
    lastname: user?.lastname || 'Kennedy',
    email: user?.email || 'tracyk321@gmail.com',
    contactnumber: user?.contactnumber || '+27 79 384 0029',
    nationality: user?.nationality || 'South African',
    idnumber: user?.idnumber || 8511055123084,
    address: user?.address || '47 Strawberry Lane, Constantia, Cape Town, 7806',
    dateofbirth: user?.dateofbirth || '1984-11-23',
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6">Partner 1 Details</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ pt: 3, mb: 3 }}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="firstname" label="First Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="lastname" label="Last Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email" label="Email" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="contactnumber" label="Contact Number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect name="nationality" label="Nationality" variant={'outlined'}>
                <option />
                <option value={'South African'}>South African</option>
                <option value={'Zimbabwean'}>Zimbabwean</option>
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="idnumber" label="ID / Passport Number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="address" label="Address" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDatePicker name="dateofbirth" label="Date of Birth" />
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
