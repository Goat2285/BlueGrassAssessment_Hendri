import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostPartnerDetailsRequest,
  postPartnerDetails,
} from 'src/services/api/auth/postPartnerDetails';

type UsePostPartnerDetailsOptions = Omit<
  UseMutationOptions<any, Error, IPostPartnerDetailsRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostPartnerDetails = (queryOptions?: UsePostPartnerDetailsOptions) =>
  useMutation(['postPartnerDetails'], postPartnerDetails, queryOptions);
