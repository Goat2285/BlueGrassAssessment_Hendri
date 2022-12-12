import * as Yup from 'yup';
import { Box, Button, Stack } from '@mui/material';
import FormProvider, { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IGetDoctorResponse } from 'src/services/api/doctors/getDoctors';
import { usePostInviteNewPatient } from 'src/hooks/api/patients/usePostInviteNewPatient';

type Props = {
  closeDialog: () => void;
  doctors?: IGetDoctorResponse[];
};

type UserFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  doctorId: number;
  redirectUrl: string;
};

export default function InviteNewPatient({ closeDialog, doctors }: Props) {
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    contactNumber: Yup.string()
      .trim()
      .matches(phoneRegex, 'Please use the following format: +27 72 000 0000')
      .required('Contact number is required'),
    doctorId: Yup.string().required('Assigned doctor is required'),
  });

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    doctorId: undefined,
    redirectUrl: `${process.env.REACT_APP_HOST_API_KEY}/auth/register`,
  };

  const methods = useForm<UserFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { mutate: postSubmit } = usePostInviteNewPatient({
    onSuccess: () => {
      reset();
      closeDialog();
      enqueueSnackbar('Patient has been invited!');
    },
    onError: () => {
      enqueueSnackbar('Error, patient not invited!', { variant: 'error' });
    },
  });

  const onSubmit = async (data: UserFormProps) => {
    postSubmit(data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods}>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="contactNumber" label="Contact Number" />
          <RHFSelect name="doctorId" label="Assigned Doctor">
            <option />
            {doctors?.map(({ id, firstName, lastName }) => (
              <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
            ))}
          </RHFSelect>
        </Stack>

        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={closeDialog} size={'large'} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size={'large'}
            sx={{ flex: 1, mt: { xs: 2 } }}
          >
            Add patient
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
