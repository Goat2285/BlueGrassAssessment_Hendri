import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SingleColumnLayout from '../layouts/singleColumn';
// config
import { PATH_AFTER_LOGIN } from '../config';

//
import {
  Page404,
  WelcomePage,
  LoginPage,
  AccountDisabledPage,
  ForgotPasswordPage,
  UpdatePasswordPage,
  RegisterPage,
  DashboardPage,
  MyProfilePage,
  ManageUsersPage,
  ManagePatientsPage,
  LogsPage,
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
              path: 'dashboard',
              element: (
                //<AuthGuard>
                <DashboardLayout />
                //</AuthGuard>
              ),
              children: [
                { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
                { path: 'app', element: <DashboardPage /> },
                { path: 'profile', element: <MyProfilePage /> },
                { path: 'users', element: <ManageUsersPage /> },
                { path: 'patients', element: <ManagePatientsPage /> },
                { path: 'logs', element: <LogsPage /> },
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
