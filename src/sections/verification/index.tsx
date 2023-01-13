import { Typography, Stack, Link } from '@mui/material';
import VerifyForm from './VerifyForm';

export default function Verification() {
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
        We've emailed a 6-digit confirmation code to <strong>acb@domain</strong>, please enter the
        code in below box to verify your email.
      </Typography>

      <VerifyForm />

      <Typography variant="body2" sx={{ mt: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography>
    </Stack>
  );
}
