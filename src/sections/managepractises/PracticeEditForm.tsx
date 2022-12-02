import * as Yup from 'yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePutPractice } from 'src/hooks/api/practices/usePutPractice';

type PracticeFormProps = {
  id: number;
  name: string;
  practiceNumber?: string;
  registrationNumber?: string;
  physicalAddress: string;
  email: string;
  telephone: string;
  status: boolean;
};

type Props = {
  id: number;
  name?: string;
  practiceNumber?: string;
  registrationNumber?: string;
  physicalAddress?: string;
  email?: string;
  telephone?: string;
  status: boolean;
  closeDialog: () => void;
  refetch: () => void;
};

export default function PracticeEditForm({
  closeDialog,
  refetch,
  id,
  name,
  practiceNumber,
  registrationNumber,
  physicalAddress,
  email,
  telephone,
  status,
}: Props) {
  const phoneRegex = /^\+[1-9]{1}[0-9 | \s]{3,14}$/;

  const schema = Yup.object().shape({
    name: Yup.string().required('Practise name is required'),
    physicalAddress: Yup.string().required('Physical address is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    telephone: Yup.string()
      .trim()
      .matches(phoneRegex, 'Please use the following format: +27 72 000 0000')
      .required('Contact number is required'),
  });

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateSubmit } = usePutPractice({
    onSuccess: () => {
      refetch();
      enqueueSnackbar('Practise has been updated!');
    },
    onError: () => {
      enqueueSnackbar('Error, practise not updated!', { variant: 'error' });
    },
  });

  const defaultValues = {
    id: id,
    name: name,
    practiceNumber: practiceNumber || '',
    registrationNumber: registrationNumber || '',
    physicalAddress: physicalAddress,
    email: email,
    telephone: telephone,
    status: status,
  };

  const methods = useForm<PracticeFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: PracticeFormProps) => {
    updateSubmit({
      id: data.id,
      putData: {
        name: data.name,
        practiceNumber: data.practiceNumber || '',
        registrationNumber: data.registrationNumber || '',
        physicalAddress: data.physicalAddress,
        email: data.email,
        telephone: data.telephone,
        status: data.status,
      },
    });
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
            Edit Practise
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
