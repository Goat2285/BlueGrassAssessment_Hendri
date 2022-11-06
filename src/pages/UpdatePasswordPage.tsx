import { Helmet } from 'react-helmet-async';
import Updatepassword from '../sections/updatepassword';

// ----------------------------------------------------------------------

export default function UpdatePasswordPage() {
  return (
    <>
      <Helmet>
        <title>Update password</title>
      </Helmet>
      <Updatepassword />
    </>
  );
}
