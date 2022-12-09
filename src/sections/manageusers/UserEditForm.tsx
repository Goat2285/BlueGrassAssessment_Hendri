import * as Yup from 'yup';
import { Box, Button, Stack } from '@mui/material';
import FormProvider, { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePutUser } from 'src/hooks/api/users/usePutUser';

export type UserEditFormProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type Props = {
  closeDialog: () => void;
  refetch: () => void;
  roles?: string[];
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function UserEditForm({
  closeDialog,
  refetch,
  roles,
  id,
  firstName,
  lastName,
  email,
  role,
}: Props) {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    id,
    firstName,
    lastName,
    email,
    role,
  };

  const methods = useForm<UserEditFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateSubmit } = usePutUser({
    onSuccess: () => {
      refetch();
      enqueueSnackbar('User has been updated!');
    },
    onError: () => {
      enqueueSnackbar('Error, user not updated!', { variant: 'error' });
    },
  });

  const onSubmit = (data: UserEditFormProps) => {
    updateSubmit({
      id: data.id,
      putData: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      },
    });
    closeDialog();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods}>
        <Stack spacing={3}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
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
            Edit user
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
