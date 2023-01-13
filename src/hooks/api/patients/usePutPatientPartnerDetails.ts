import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPutPatientPartnerDetailsRequest,
  putPatientPartnerDetails,
} from 'src/services/api/patients/putPatientPartnerDetails';

type UsePutPatientPartnerDetailsOptions = Omit<
  UseMutationOptions<any, Error, IPutPatientPartnerDetailsRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutPatientPartnerDetails = (queryOptions?: UsePutPatientPartnerDetailsOptions) =>
  useMutation(['putPatientPartnerDetails'], putPatientPartnerDetails, queryOptions);
