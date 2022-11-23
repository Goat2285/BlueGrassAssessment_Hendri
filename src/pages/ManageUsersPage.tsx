import { Helmet } from 'react-helmet-async';
import ManageUsers from 'src/sections/manageusers';
// @mui
import { Container } from '@mui/material';
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
        <ManageUsers />
      </Container>
    </>
  );
}
