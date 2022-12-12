import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getLatestPractices,
  IGetLatestPracticesRequest,
} from 'src/services/api/practices/getLatestPractices';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';

type UseGetLatestPracticesOptions = Omit<
  UseQueryOptions<IPracticeResponse[], Error, IGetLatestPracticesRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetLatestPractices = (queryOptions?: UseGetLatestPracticesOptions) =>
  useQuery(['getLatestPractices'], getLatestPractices, queryOptions);
