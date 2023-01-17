import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import PatientProfile from 'src/sections/patientprofile';

// ----------------------------------------------------------------------

export default function PatientMyProfilePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <PatientProfile />
      </Container>
    </>
  );
}
