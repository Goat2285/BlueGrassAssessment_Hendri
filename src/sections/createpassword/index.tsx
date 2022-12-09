import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useMemo } from 'react';
import CreatePassWordStep2 from './Step2';
import CreatePassWordStep1 from './Step1';
import { useSnackbar } from '../../components/snackbar';
import { useNavigate } from 'react-router';
import { usePostCreatePassword } from 'src/hooks/api/auth/usePostCreatePassword';

const PASSWORDREGEX = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])\w+/g;

export default function CreatePassword() {
  const getURLValues = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('t')?.replace(/ /g, '+');
    const member = params.get('m')?.replace(/ /g, '+');

    if (!token || !member) {
      return {
        userId: 'Unknown',
        token: 'Unknown',
      };
    }

    return {
      userId: member,
      token: token,
    };
  };

  const userDetails = useMemo(() => getURLValues(), []);

  type FormValuesProps = {
    password: string;
    confirmpassword: string;
    memberKey: string;
    token: string;
    afterSubmit?: string;
  };

  const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(
        PASSWORDREGEX,
        'Password must contain atleast one lowercase, one uppercase, one number and a special character'
      )
      .min(8, 'Please enter a password that is atleast 8 characters long'),
    confirmpassword: Yup.string()
      .required('Password confirm is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .min(8, 'Please use a password that is longer than 8 characters'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdatePasswordSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: postSubmit,
    isSuccess,
    isLoading,
  } = usePostCreatePassword({
    onSuccess: () => {
      enqueueSnackbar('Password has been created!');
    },
    onError: () => {
      enqueueSnackbar('Error, password not created!', { variant: 'error' });
    },
  });

  const onSubmit = (data: FormValuesProps) => {
    const postData = Object.assign(data, {
      memberKey: userDetails.userId,
      token: userDetails.token,
    });
    postSubmit(postData);
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 480,
      }}
    >
      {isSuccess ? (
        <CreatePassWordStep2 />
      ) : (
        <CreatePassWordStep1
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isLoading}
          methods={methods}
        />
      )}
    </Stack>
  );
}
