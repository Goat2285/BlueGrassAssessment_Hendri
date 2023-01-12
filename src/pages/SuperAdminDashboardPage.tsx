import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import SuperAdminDashboard from 'src/sections/superadmindashboard';

// ----------------------------------------------------------------------

export default function SuperAdminDashboardPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <SuperAdminDashboard />
      </Container>
    </>
  );
}
