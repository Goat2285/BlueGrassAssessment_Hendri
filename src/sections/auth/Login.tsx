// @mui
import { Stack, Typography, Link } from '@mui/material';

// layouts
import LoginLayout from '../../layouts/login';

// Components
import AuthLoginForm from './AuthLoginForm';

// Styles
import { StylesGettingStarted } from './styles';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <StylesGettingStarted>
        <Typography variant="body2">
          Don’t have an account? &nbsp;
          <Link
            variant="body2"
            color="inherit"
            underline="hover"
            sx={{ cursor: 'pointer', color: 'primary.dark', fontWeight: 'bold' }}
            href="auth/register"
          >
            Get started
          </Link>
        </Typography>
      </StylesGettingStarted>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body1" color="text.secondary">
            Please enter your details to continue.
          </Typography>
        </Stack>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}
