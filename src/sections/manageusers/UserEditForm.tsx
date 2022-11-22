import * as Yup from 'yup';
import { Box, Button, Stack } from '@mui/material';
import FormProvider, { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePutUser } from 'src/hooks/api/users/usePutUser';

export type UserEditFormProps = {
  id: number;
  email: string;
  fullname: string;
  role: string;
};

type Props = {
  closeDialog: () => void;
  refetch: () => void;
  id: number;
  fullname: string;
  email: string;
  role: string;
};

export default function UserEditForm({ closeDialog, refetch, id, fullname, email, role }: Props) {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    id: id,
    fullname: fullname,
    email: email,
    role: role,
  };

  const methods = useForm<UserEditFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { mutate: updateSubmit } = usePutUser({
    onSuccess: refetch,
  });

  const onSubmit = (data: UserEditFormProps) => {
    updateSubmit({
      id: data.id,
      putData: {
        fullname: data.fullname,
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
          <RHFTextField name="fullname" label="Full Name" />
          <RHFTextField name="email" label="Email" />
          <RHFSelect name="role" label="Role">
            <option />
            <option value={'Doctor'}>Doctor</option>
            <option value={'Staff'}>Staff</option>
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
