import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getRoles } from 'src/services/roles/getRoles';

type UseGetRolesOptions = Omit<
  UseQueryOptions<string[], Error, string[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetRoles = (queryOptions?: UseGetRolesOptions) =>
  useQuery(['getRoles'], getRoles, queryOptions);
