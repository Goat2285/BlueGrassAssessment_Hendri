import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

// ----------------------------------------------------------------------

export default function PatientMyProfilePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" paragraph>
          Patient Profile Page
        </Typography>
      </Container>
    </>
  );
}
