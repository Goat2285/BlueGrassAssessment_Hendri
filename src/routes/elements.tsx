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

//  Auth Pages
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/UpdatePasswordPage')));
export const AccountDisabledPage = Loadable(lazy(() => import('../pages/AccountDisabledPage')));
export const ForgotPasswordPage = Loadable(lazy(() => import('../pages/ForgotPasswordPage')));
export const UpdatePasswordPage = Loadable(lazy(() => import('../pages/UpdatePasswordPage')));
export const ManageUsersPage = Loadable(lazy(() => import('../pages/ManageUsersPage')));

// Register
export const RegisterPage = Loadable(lazy(() => import('../pages/RegisterPage')));

// Dashboard
export const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

// Other
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const WelcomePage = Loadable(lazy(() => import('../pages/WelcomePage')));
