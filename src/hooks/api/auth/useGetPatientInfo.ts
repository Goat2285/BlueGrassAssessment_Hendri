import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPatientInfo, IGetPatientInfoResponse } from 'src/services/api/auth/getPatientInfo';

type UseGetPatientInfoOptions = Omit<
  UseQueryOptions<IGetPatientInfoResponse, Error, IGetPatientInfoResponse, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetPatientInfo = (
  validData: {
    memberKey: string;
    token: string;
  },
  queryOptions?: UseGetPatientInfoOptions
) => useQuery(['getPatientInfo'], () => getPatientInfo(validData), queryOptions);
