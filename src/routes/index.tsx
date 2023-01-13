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
  CreatePasswordPage,
  PatientDashboardPage,
  FertilityContentPage,
  MyConsentsPage,
  SuperAdminMyProfilePage,
  SuperAdminLogsPage,
  PatientMyProfilePage,
  VerificationPage,
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
            { path: 'app', element: <SuperAdminDashboardPage /> },
            { path: 'profile', element: <SuperAdminMyProfilePage /> },
            { path: 'practises', element: <ManagePractisesPage /> },
            { path: 'logs', element: <SuperAdminLogsPage /> },
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
            { path: 'app', element: <PatientDashboardPage /> },
            { path: 'profile', element: <PatientMyProfilePage /> },
            { path: 'fertility-content', element: <FertilityContentPage /> },
            { path: 'my-consents', element: <MyConsentsPage /> },
          ],
        },
        {
          path: '/',
          element: (
            // <AuthGuard>
            <SingleColumnLayout />
            // </AuthGuard>
          ),
          children: [{ path: 'verification', element: <VerificationPage /> }],
        },
        {
          path: 'auth',
          element: <SingleColumnLayout />,
          children: [
            { path: 'disabled', element: <AccountDisabledPage /> },
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
