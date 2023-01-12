import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

// ----------------------------------------------------------------------

export default function PatientDashboardPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" paragraph>
          Dashboard Page
        </Typography>
      </Container>
    </>
  );
}
