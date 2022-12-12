import { axiosRequest } from 'src/services/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const login = (data: any) => axiosRequest('POST', '/api/Account/SignIn', { data });

export const useLogin = (data: any) =>
  useQuery(['loginUser', data], () => login(data), { enabled: false, retry: false, cacheTime: 0 });
