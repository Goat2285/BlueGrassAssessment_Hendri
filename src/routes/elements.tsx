import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/ResetPasswordPage')));

export const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
export const ManageUsersPage = Loadable(lazy(() => import('../pages/ManageUsersPage')));
export const ProfilePage = Loadable(lazy(() => import('../pages/ProfilePage')));
export const PatientsPage = Loadable(lazy(() => import('../pages/PatientsPage')));
export const LogsPage = Loadable(lazy(() => import('../pages/LogsPage')));
export const ManagePractisesPage = Loadable(lazy(() => import('../pages/ManagePractisesPage')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
