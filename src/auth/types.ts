// ----------------------------------------------------------------------

import { AxiosPromise } from 'axios';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

export interface ILoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginReponse {
  isSuccess: boolean;
  title: string;
  errors: string[];
}

export type JWTContextType = {
  method: 'jwt';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (data: any) => Promise<any>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<any>;
};
