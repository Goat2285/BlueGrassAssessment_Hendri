import * as Yup from 'yup';
import { useAuthContext } from 'src/auth/useAuthContext';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { CustomFile } from 'src/components/upload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { RHFUploadAvatar } from 'src/components/hook-form/RHFUpload';
import { fData } from 'src/utils/formatNumber';
import { useGetRoles } from 'src/hooks/api/roles/useGetRoles';
import { LoadingButton } from '@mui/lab';

type FormValuesProps = {
  fullname: string;
  email: string;
  role: string;
  avatar?: CustomFile | string | null;
};

export default function MyDetails() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const { data: roles } = useGetRoles();

  const schema = Yup.object().shape({
    fullname: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
  });

  // Need to be changed

  const defaultValues = {
    fullname: user?.fullname || 'Adrian Stefan',
    email: user?.email || 'adrian@fertility.com',
    role: user?.role || 'Doctor',
    avatar: user?.avatar || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile);
      }
    },
    [setValue]
  );

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {user?.fullname || 'Adrian Stefan'}
            </Typography>
            <RHFUploadAvatar
              name="avatar"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'grey.600',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, pt: 6 }}>
            <Typography variant="h6">My Details</Typography>
            <Stack spacing={3} sx={{ pt: 4, mb: '20px' }}>
              <RHFTextField name="fullname" label="Fullname" />
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
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
