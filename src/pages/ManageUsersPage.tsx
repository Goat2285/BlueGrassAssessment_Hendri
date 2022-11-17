import { Helmet } from 'react-helmet-async';
import ManageUsers from 'src/sections/manageusers';

// ----------------------------------------------------------------------

export default function ManageUsersPage() {
  return (
    <>
      <Helmet>
        <title> Manage Users</title>
      </Helmet>

      <ManageUsers />
    </>
  );
}
