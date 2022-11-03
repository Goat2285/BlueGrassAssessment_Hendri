// @mui
import { Stack, Typography } from '@mui/material';

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
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body1" color='text.secondary'>Please enter your details to continue.</Typography>
        </Stack>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}
