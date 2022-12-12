import { Helmet } from 'react-helmet-async';
import CreatePassword from 'src/sections/createpassword';

// ----------------------------------------------------------------------

export default function CreatePasswordPage() {
  return (
    <>
      <Helmet>
        <title>Update password</title>
      </Helmet>
      <CreatePassword />
    </>
  );
}
