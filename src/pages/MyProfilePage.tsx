import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> My Profile</title>
      </Helmet>
    </>
  );
}