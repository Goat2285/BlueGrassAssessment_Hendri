import { Typography, Stack, Link } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePostResendVerificationCode } from 'src/hooks/api/verification/usePostResendVerificationCode';
import VerifyForm from './VerifyForm';

export default function Verification() {
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: postResendVerificationCode } = usePostResendVerificationCode({
    onSuccess: () => {
      enqueueSnackbar('Your new verification code has been sent, please check your email');
    },
    onError: () => {
      enqueueSnackbar('Error, verification code not sent');
    },
  });

  useEffect(() => {
    const item = localStorage.getItem('verification');

    if (item) {
      setNewEmail(JSON.parse(item));
    } else {
      navigate(-1);
    }
  }, [navigate]);

  const handleResendVerificationCode = () => {
    postResendVerificationCode({
      email: newEmail,
    });
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 480,
        py: 5,
        px: 4,
      }}
    >
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        Please check your email!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: 'grey.600', mb: 5, textAlign: 'center', fontWeight: 400 }}
      >
        We've emailed a 6-digit confirmation code to <strong>{newEmail}</strong>, please enter the
        code in below box to verify your email.
      </Typography>

      <VerifyForm email={newEmail} />

      <Typography variant="body2" sx={{ mt: 3 }}>
        Don’t have a code? &nbsp;
        <Link
          variant="subtitle2"
          onClick={handleResendVerificationCode}
          sx={{
            cursor: 'pointer',
          }}
        >
          Resend code
        </Link>
      </Typography>
    </Stack>
  );
}
