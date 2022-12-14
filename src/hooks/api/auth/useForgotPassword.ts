import { axiosRequest } from 'src/services/axiosConfig';
import { useQuery } from "@tanstack/react-query";

const forgotPassword = (data: any) => axiosRequest('POST', '/api/Account/ForgotPassword', { data });

export const useForgotPassword= (data: any) => useQuery(['forgotPassword', data], () => forgotPassword(data), { enabled: false, retry: false, cacheTime: 0 })