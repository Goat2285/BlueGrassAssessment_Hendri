import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SingleColumnLayout from '../layouts/singleColumn';
// config
import {
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGIN_PATIENT,
  PATH_AFTER_LOGIN_SUPER_ADMIN,
} from '../config';

//
import {
  Page404,
  WelcomePage,
  LoginPage,
  ForgotPasswordPage,
  UpdatePasswordPage,
  RegisterPage,
  CreatePasswordPage,
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
          ],
        },
        {
          path: '/superadmin/dashboard',
          element: (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_LOGIN_SUPER_ADMIN} replace />, index: true },
          ],
        },
        {
          path: '/patient/dashboard',
          element: (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_LOGIN_PATIENT} replace />, index: true },
          ],
        },
        {
          path: 'auth',
          element: <SingleColumnLayout />,
          children: [
            { path: 'forgotpassword', element: <ForgotPasswordPage /> },
            { path: 'updatepassword', element: <UpdatePasswordPage /> },
            { path: 'createpassword', element: <CreatePasswordPage /> },
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
