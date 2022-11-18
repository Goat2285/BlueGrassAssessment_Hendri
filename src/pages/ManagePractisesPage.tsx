import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import ManagePractises from 'src/sections/managepractises';

// ----------------------------------------------------------------------

export default function ManagePractisesPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Manage Practises</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ManagePractises />
      </Container>
    </>
  );
}
