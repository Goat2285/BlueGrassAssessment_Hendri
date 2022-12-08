import { axiosRequest } from 'src/services/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const login = (data: any) => axiosRequest('POST', '/api/Account/SignIn', { data });

export const useLogin = (data: any) =>
  useQuery(['loginUser', data], () => login(data), { enabled: false, retry: false, cacheTime: 0 });

// import { useMutation, UseMutationOptions } from '@tanstack/react-query';
// import { IPostLoginRequest, IPostLoginResponse, login } from 'src/services/api/auth/postLogin';

// type UseLoginOptions = Omit<
//   UseMutationOptions<IPostLoginResponse, Error, IPostLoginRequest, Array<string>>,
//   'queryKey' | 'queryFn'
// >;

// export const useLogin = (queryOptions?: UseLoginOptions) =>
//   useMutation(['login'], login, queryOptions);
