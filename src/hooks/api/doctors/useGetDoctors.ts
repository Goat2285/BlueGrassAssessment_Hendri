import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getDoctors, IGetDoctorResponse } from 'src/services/api/doctors/getDoctors';

type UseGetDoctorsOptions = Omit<
  UseQueryOptions<IGetDoctorResponse[], Error, IGetDoctorResponse[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetDoctors = (queryOptions?: UseGetDoctorsOptions) =>
  useQuery(['getDoctors'], getDoctors, queryOptions);
