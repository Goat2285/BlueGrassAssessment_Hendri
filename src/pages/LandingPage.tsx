import { Helmet } from 'react-helmet-async';
import Landing from 'src/sections/landing';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Landing />
    </>
  );
}
