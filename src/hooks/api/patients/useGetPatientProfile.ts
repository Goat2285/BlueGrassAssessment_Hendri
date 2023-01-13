import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getPatientProfile,
  IGetPatientProfileResponse,
} from 'src/services/api/patients/getPatientProfile';

type UseGetPatientProfileOptions = Omit<
  UseQueryOptions<IGetPatientProfileResponse, Error, IGetPatientProfileResponse, Array<string>>,
  'queryKey' | 'qeryFn'
>;

export const useGetPatientProfile = (queryOptions?: UseGetPatientProfileOptions) =>
  useQuery(['getPatientProfile'], getPatientProfile, queryOptions);
