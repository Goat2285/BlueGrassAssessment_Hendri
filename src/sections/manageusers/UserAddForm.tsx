import * as Yup from 'yup';
import { Box, Button, Stack } from '@mui/material';
import FormProvider, { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostUser } from 'src/hooks/api/users/usePostUser';

type UserFormProps = {
  email: string;
  fullname: string;
  role: string;
};

type Props = {
  closeDialog: () => void;
  refetch: () => void;
  roles?: string[];
};

export default function UserAddForm({ closeDialog, refetch, roles }: Props) {
  const schema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
  });

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: postSubmit } = usePostUser({
    onSuccess: () => {
      refetch();
      enqueueSnackbar('User has been added!');
    },
    onError: () => {
      enqueueSnackbar('Error, user not added!', { variant: 'error' });
    },
  });

  const defaultValues = {
    fullname: '',
    email: '',
    role: '',
  };

  const methods = useForm<UserFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: UserFormProps) => {
    postSubmit(data);
    closeDialog();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods}>
        <Stack spacing={3}>
          <RHFTextField name="fullname" label="Full Name" />
          <RHFTextField name="email" label="Email" />
          <RHFSelect name="role" label="Role">
            <option />
            {roles?.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
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
            Add user
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
