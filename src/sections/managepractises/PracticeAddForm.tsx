import * as Yup from 'yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostPractice } from 'src/hooks/api/practices/usePostPractice';

type PracticeFormProps = {
  name: string;
  practiceNumber?: string;
  registrationNumber?: string;
  physicalAddress: string;
  email: string;
  telephone: string;
  status: boolean;
  adminFirstname: string;
  adminLastname: string;
  adminEmail: string;
};

type Props = {
  closeDialog: () => void;
  refetch: () => void;
};

export default function PracticeAddForm({ closeDialog, refetch }: Props) {
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;

  const schema = Yup.object().shape({
    name: Yup.string().required('Practise name is required'),
    physicalAddress: Yup.string().required('Physical address is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    telephone: Yup.string()
      .trim()
      .matches(phoneRegex, 'Please use the following format: +27 72 000 0000')
      .required('Contact number is required'),
    adminFirstname: Yup.string().required('Admin first name is required'),
    adminLastname: Yup.string().required('Admin last name is required'),
    adminEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Admin email is required'),
  });

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: postSubmit } = usePostPractice({
    onSuccess: () => {
      refetch();
      enqueueSnackbar('Practise has been added!');
    },
    onError: () => {
      enqueueSnackbar('Error, practise not added!', { variant: 'error' });
    },
  });

  const defaultValues = {
    name: '',
    practiceNumber: '',
    registrationNumber: '',
    physicalAddress: '',
    email: '',
    telephone: '',
    status: false,
    adminFirstname: '',
    adminLastname: '',
    adminEmail: '',
  };

  const methods = useForm<PracticeFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: PracticeFormProps) => {
    postSubmit(data);
    closeDialog();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods}>
        <Typography variant="h6" sx={{ textAlign: 'left !important' }}>
          Practise Details
        </Typography>
        <Stack spacing={3} sx={{ pt: 2, mb: 3 }}>
          <RHFTextField name="name" label="Practise Name" />
          <RHFTextField name="practiceNumber" label="Practise Number" />
          <RHFTextField name="registrationNumber" label="Registration Number (CIPC)" />
          <RHFTextField name="physicalAddress" label="Physical Address" />
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="telephone" label="Contact Number" />
        </Stack>
        <Typography variant="h6" sx={{ textAlign: 'left !important' }}>
          Admin User
        </Typography>
        <Stack spacing={3} sx={{ pt: 2, mb: 4 }}>
          <RHFTextField name="adminFirstname" label="First Name" />
          <RHFTextField name="adminLastname" label="Last Name" />
          <RHFTextField name="adminEmail" label="Email" />
        </Stack>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2}>
          <Button variant="outlined" onClick={closeDialog} size={'large'} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size={'large'}
            sx={{ flex: 1, mt: { xs: 2 } }}
          >
            Add Practise
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
