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


// ----- Auth Pages ----------
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/UpdatePasswordPage')));
export const AccountDisabledPage = Loadable(lazy(() => import('../pages/AccountDisabledPage')));
export const ForgotPasswordPage = Loadable(lazy(() => import('../pages/ForgotPasswordPage')));
export const UpdatePasswordPage = Loadable(lazy(() => import('../pages/UpdatePasswordPage')));


export const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
export const ManageUsersPage = Loadable(lazy(() => import('../pages/ManageUsersPage')));
export const ProfilePage = Loadable(lazy(() => import('../pages/ProfilePage')));
export const PatientsPage = Loadable(lazy(() => import('../pages/PatientsPage')));
export const LogsPage = Loadable(lazy(() => import('../pages/LogsPage')));
export const ManagePractisesPage = Loadable(lazy(() => import('../pages/ManagePractisesPage')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
