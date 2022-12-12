import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getLatestPractices } from 'src/services/api/practices/getLatestPractices';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';

type UseGetLatestPracticesOptions = Omit<
  UseQueryOptions<IPracticeResponse[], Error, IPracticeResponse[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetLatestPractices = (
  practicesCount: { count: number },
  queryOptions?: UseGetLatestPracticesOptions
) => useQuery(['getLatestPractices'], () => getLatestPractices(practicesCount), queryOptions);
