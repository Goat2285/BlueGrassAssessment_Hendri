import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import Landing from 'src/sections/landing';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Landing />
      </Container>
    </>
  );
}
