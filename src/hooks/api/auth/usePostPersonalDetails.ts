import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostPersonalDetailsRequest,
  postPersonalDetails,
} from 'src/services/api/auth/postPersonalDetails';

type UsePostPersonalDetailsOptions = Omit<
  UseMutationOptions<any, Error, IPostPersonalDetailsRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostPersonalDetails = (queryOptions?: UsePostPersonalDetailsOptions) =>
  useMutation(['postPersonalDetails'], postPersonalDetails, queryOptions);
