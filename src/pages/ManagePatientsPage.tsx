import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import ManagePatients from 'src/sections/managepatients';

// ----------------------------------------------------------------------

export default function ManagePatientsPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Manage Patients</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" paragraph>
          Manage Patients Page
        </Typography>
        <ManagePatients />
      </Container>
    </>
  );
}
