import { Helmet } from 'react-helmet-async';
import CreatePassword from 'src/sections/createpassword';

// ----------------------------------------------------------------------

export default function CreatePasswordPage() {
  return (
    <>
      <Helmet>
        <title>Create password</title>
      </Helmet>
      <CreatePassword />
    </>
  );
}
