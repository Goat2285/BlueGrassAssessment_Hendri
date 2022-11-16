import { Helmet } from 'react-helmet-async';
import Register from '../sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Register />
    </>
  );
}
