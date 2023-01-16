import * as Yup from 'yup';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { CustomFile } from 'src/components/upload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { RHFUploadAvatar } from 'src/components/hook-form/RHFUpload';
import { fData } from 'src/utils/formatNumber';
import { LoadingButton } from '@mui/lab';
import { usePutProfile } from 'src/hooks/api/account/usePutProfile';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useNavigate } from 'react-router';

type FormValuesProps = {
  firstname: string;
  lastname: string;
  email: string;
  profilePictureUrl?: CustomFile | string | null;
};

type Props = {
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
  profilePictureUrl?: string | null;
  roles?: string[];
  refetch: () => void;
};

export default function MyDetails({
  firstname,
  lastname,
  email,
  role,
  profilePictureUrl,
  roles,
  refetch,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { initialize } = useAuthContext();

  const navigate = useNavigate();

  const { mutate: updateSubmit } = usePutProfile({
    onSuccess: (data) => {
      if (data.isMailChanged) {
        localStorage.setItem('verification', JSON.stringify(data.email));
        navigate('/verification');
      } else {
        refetch();
        initialize();
        enqueueSnackbar('Profile details has been updated!');
      }
    },
    onError: () => {
      enqueueSnackbar('Error, profile details not updated!', { variant: 'error' });
    },
  });

  const schema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const defaultValues = {
    firstname,
    lastname,
    email,
    role,
    profilePictureUrl: profilePictureUrl || null,
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
        setValue('profilePictureUrl', newFile);
      }
    },
    [setValue]
  );

  const onSubmit = async (data: FormValuesProps) => {
    updateSubmit({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      profilePicture: data.profilePictureUrl,
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {`${firstname} ${lastname}`}
            </Typography>
            <RHFUploadAvatar
              name="profilePictureUrl"
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
              <RHFTextField name="firstname" label="First name" />
              <RHFTextField name="lastname" label="Last name" />
              <RHFTextField name="email" label="Email" />
              <RHFSelect name="role" label="Role" disabled>
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
