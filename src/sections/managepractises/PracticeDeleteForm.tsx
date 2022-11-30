import * as Yup from 'yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import FormProvider from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDeletePractice } from 'src/hooks/api/practices/useDeletePractice';

export type UserDeleteFormProps = {
  id: number;
};

type Props = {
  closeDialog: () => void;
  refetch: () => void;
  id: number;
};

export default function PracticeDeleteForm({ closeDialog, refetch, id }: Props) {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  const defaultValues = {
    id: id,
  };

  const methods = useForm<UserDeleteFormProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: deleteSubmit } = useDeletePractice({
    onSuccess: () => {
      refetch();
      enqueueSnackbar('Practice has been deleted!');
    },
    onError: () => {
      enqueueSnackbar('Error, practice not deleted!', { variant: 'error' });
    },
  });

  const onSubmit = (data: UserDeleteFormProps) => {
    deleteSubmit({
      id: data.id,
    });
    closeDialog();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Are you sure you want to delete this practice?
        </Typography>

        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button variant="outlined" onClick={closeDialog} size={'large'} sx={{ flex: 1 }}>
            No, Cancel
          </Button>
          <Button
            variant="contained"
            size={'large'}
            sx={{ flex: 1, mt: { xs: 2 } }}
            onClick={handleSubmit(onSubmit)}
          >
            Yes, Confirm
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
