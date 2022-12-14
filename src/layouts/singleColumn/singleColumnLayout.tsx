import { Outlet } from 'react-router-dom';
// @mui
import { Stack, Container, Box } from '@mui/material';
//
import Header from './Header';

// ----------------------------------------------------------------------

export default function SingleColumnLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: ' 100%',
      }}
    >
      <Header />
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
