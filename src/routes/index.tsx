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
  SuperAdminDashboardPage,
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
              path: 'admin',
              element: <DashboardLayout />,
              children: [{ path: 'dashboard', element: <SuperAdminDashboardPage /> }],
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
