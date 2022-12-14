import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProfile, IGetProfileResponse } from 'src/services/api/account/getProfile';

type UseGetProfileOptions = Omit<
  UseQueryOptions<IGetProfileResponse, Error, IGetProfileResponse, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetProfile = (queryOptions?: UseGetProfileOptions) =>
  useQuery(['getProfile'], getProfile, queryOptions);
