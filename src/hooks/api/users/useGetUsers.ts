import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUsers, IUserResponse } from 'src/services/users/getUsers';

type UseGetUsersOptions = Omit<
  UseQueryOptions<IUserResponse[], Error, IUserResponse[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetUsers = (queryOptions?: UseGetUsersOptions) =>
  useQuery(['getUsers'], getUsers, queryOptions);
