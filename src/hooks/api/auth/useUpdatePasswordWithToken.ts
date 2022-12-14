import { axiosRequest } from 'src/services/axiosConfig';
import { useQuery } from "@tanstack/react-query";

const updatePasswordWithToken  = (data: any) => axiosRequest('POST', '/api/Account/UpdatePasswordWithToken', { data });

export const useUpdatePasswordWithToken = (data: any) => useQuery(['updatePasswordWithToken', data], () => updatePasswordWithToken(data), { enabled: false, retry: false, cacheTime: 0 })