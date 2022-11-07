import { Helmet } from 'react-helmet-async';
import Welcome from '../sections/welcome';

// ----------------------------------------------------------------------

export default function WelcomePage() {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Welcome />
    </>
  );
}
