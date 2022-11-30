import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import ClinicProfile from 'src/sections/clinicprofile';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> My Profile</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ClinicProfile />
      </Container>
    </>
  );
}
