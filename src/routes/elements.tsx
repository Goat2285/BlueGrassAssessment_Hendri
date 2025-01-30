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
export const ForgotPasswordPage = Loadable(lazy(() => import('../pages/ForgotPasswordPage')));
export const UpdatePasswordPage = Loadable(lazy(() => import('../pages/UpdatePasswordPage')));
export const CreatePasswordPage = Loadable(lazy(() => import('../pages/CreatePasswordPage')));

// Register
export const RegisterPage = Loadable(lazy(() => import('../pages/RegisterPage')));

// Admin, Doctor, Staff
// Superadmin


// Patient

// Verification

// Other
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const WelcomePage = Loadable(lazy(() => import('../pages/WelcomePage')));
