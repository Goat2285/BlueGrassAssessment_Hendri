import { Helmet } from 'react-helmet-async';
import SuperAdminDashboard from 'src/sections/superadmindashboard';

// ----------------------------------------------------------------------

export default function SuperAdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <SuperAdminDashboard />
    </>
  );
}
