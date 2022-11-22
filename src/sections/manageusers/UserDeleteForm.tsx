import * as Yup from 'yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export type UserFormProps = {
  id: number;
};

type Props = {
  closeDialog: () => void;
  refetch: () => void;
  id: number;
};

export default function UserDeleteForm({ closeDialog, refetch, id }: Props) {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  const defaultValues = {
    id: id,
  };

  const methods = useForm<UserFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods}>
        <RHFTextField
          name="id"
          type="hidden"
          sx={{
            height: 0,
            '& fieldset': {
              display: 'none',
            },
          }}
        />

        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Are you sure you want to delete this user?
        </Typography>

        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button variant="outlined" onClick={closeDialog} size={'large'} sx={{ flex: 1 }}>
            No, Cancel
          </Button>
          <Button variant="contained" size={'large'} sx={{ flex: 1, mt: { xs: 2 } }}>
            Yes, Confirm
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
