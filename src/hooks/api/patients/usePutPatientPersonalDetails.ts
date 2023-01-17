import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPutPatientPersonalDetailsRequest,
  putPatientPersonalDetails,
} from 'src/services/api/patients/putPatientPersonalDetails';

type UsePutPatientPersonalDetailsOptions = Omit<
  UseMutationOptions<any, Error, IPutPatientPersonalDetailsRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutPatientPersonalDetails = (queryOptions?: UsePutPatientPersonalDetailsOptions) =>
  useMutation(['putPatientPersonalDetails'], putPatientPersonalDetails, queryOptions);
