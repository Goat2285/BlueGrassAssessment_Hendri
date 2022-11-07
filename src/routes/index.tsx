import { useRoutes } from 'react-router-dom';
// layouts
import SingleColumnLayout from '../layouts/singleColumn';

//
import {
  Page404,
  LoginPage,
  AccountDisabledPage,
  ForgotPasswordPage,
  UpdatePasswordPage,
  WelcomePage
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
              element: <WelcomePage /> 
            },
            { 
              path: 'login', 
              element: <LoginPage /> 
            },
            {
              path: 'auth', element: <SingleColumnLayout />, 
              children: [  
                { path: 'disabled', element: <AccountDisabledPage /> },
                { path: 'forgotpassword', element: <ForgotPasswordPage /> },
                { path: 'updatepassword', element: <UpdatePasswordPage /> }
              ]
            },
            {
              path: '*', element: <SingleColumnLayout />, 
              children: [  
                { path: '*', element: <Page404 /> },
              ]
            },
          ]
        },
      ]
    },
  ]);
}
