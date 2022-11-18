import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

// ----------------------------------------------------------------------

export default function ManageUsersPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Manage Users</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Manage Users Page
        </Typography>
      </Container>
    </>
  );
}