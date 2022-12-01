import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import PatientProfile from 'src/sections/patientprofile';

// ----------------------------------------------------------------------

export default function LogsPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Logs</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* <Typography variant="h3" component="h1" paragraph>
          Logs Page
        </Typography> */}
        <PatientProfile />
      </Container>
    </>
  );
}
