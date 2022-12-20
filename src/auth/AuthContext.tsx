import { createContext, useEffect, useReducer, useCallback } from 'react';
import axios from '../utils/axios';
import { isValidToken, setSession } from './utils';
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  ILoginReponse,
  ILoginRequest,
  JWTContextType,
} from './types';
import { axiosRequest } from 'src/services/axiosConfig';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const UMBRACO_COOKIE_NAME = '.AspNetCore.Identity.Application';

// Auth Login
const login = (data: any) => axiosRequest('POST', '/api/Account/SignIn', { data });

export const useLogin = () =>
  useQuery(['loginUser'], login, { enabled: false, retry: false, cacheTime: 0 });

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    await axios
      .get('/api/Account/LoggedInStatus')
      .then((res) => {
        const isLoggedIn = res?.data?.isLoggedIn;

        if (isLoggedIn) {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: true,
              user: {
                user: res?.data?.user,
              },
            },
          });
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      })
      .catch((err) => {
        console.warn(err);
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      });
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (user: any) => {
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // REGISTER
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // const response = await axios.post('/SignUp', {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });
    // const { accessToken, user } = response.data;
    // localStorage.setItem('accessToken', accessToken);
    // dispatch({
    //   type: Types.REGISTER,
    //   payload: {
    //     user,
    //   },
    // });
  };

  // LOGOUT
  const logout = async () => {
    axios.post('/api/Account/SignOut');
    dispatch({
      type: Types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        initialize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
