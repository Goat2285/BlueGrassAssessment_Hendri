import { Helmet } from 'react-helmet-async';
import ForgotPassword from '../sections/forgotpassword';

// ----------------------------------------------------------------------

export default function ForgotpasswordPage() {
  return (
    <>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      <ForgotPassword />
    </>
  );
}
