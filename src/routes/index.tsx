import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
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
  ManagePractisesPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      children: [
        {
          path: '/dashboard',
          element: (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
            { path: 'app', element: <DashboardPage /> },
            { path: 'profile', element: <MyProfilePage /> },
            { path: 'users', element: <ManageUsersPage /> },
            { path: 'patients', element: <ManagePatientsPage /> },
            { path: 'logs', element: <LogsPage /> },
            { path: 'dashboard', element: <SuperAdminDashboardPage /> },
            { path: 'practises', element: <ManagePractisesPage /> },
          ],
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
          path: 'welcome',
          element: <WelcomePage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: '*',
          element: <SingleColumnLayout />,
          children: [{ path: '*', element: <Page404 /> }],
        },
      ],
    },
  ]);
}
