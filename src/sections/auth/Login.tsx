// @mui
import { Link, Stack, Typography } from '@mui/material';

// layouts
import LoginLayout from '../../layouts/login';

// Components
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in</Typography>
        <Typography variant="body2">Don’t have an account? 
          <Link variant="body2" color="inherit" underline='hover' sx={{ cursor: "pointer" }}>Get started</Link>
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Please enter your details to continue.</Typography>
        </Stack>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}
