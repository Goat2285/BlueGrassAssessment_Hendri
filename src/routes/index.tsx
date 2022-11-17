import { useRoutes } from 'react-router-dom';
// layouts
import SingleColumnLayout from '../layouts/singleColumn';
import DashboardLayout from '../layouts/dashboard';

//
import {
  Page404,
  WelcomePage,
  LoginPage,
  AccountDisabledPage,
  ForgotPasswordPage,
  UpdatePasswordPage,
  RegisterPage,
  ManageUsersPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      children: [
        {
          path: '/',
          children: [
            {
              path: 'welcome',
              element: <WelcomePage />,
            },
            {
              path: 'login',
              element: <LoginPage />,
            },
            {
              path: 'dashboard',
              element: <DashboardLayout />,
              children: [{ path: 'users', element: <ManageUsersPage /> }],
            },
            {
              path: 'auth',
              element: <SingleColumnLayout />,
              children: [
                { path: 'disabled', element: <AccountDisabledPage /> },
                { path: 'forgotpassword', element: <ForgotPasswordPage /> },
                { path: 'updatepassword', element: <UpdatePasswordPage /> },
                { path: 'register', element: <RegisterPage /> },
              ],
            },
            {
              path: '*',
              element: <SingleColumnLayout />,
              children: [{ path: '*', element: <Page404 /> }],
            },
          ],
        },
      ],
    },
  ]);
}
