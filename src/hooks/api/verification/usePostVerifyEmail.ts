import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostVerifyEmailRequest,
  postVerifyEmail,
} from 'src/services/api/verification/postVerifyEmail';

type UsePostVerifyOptions = Omit<
  UseMutationOptions<any, Error, IPostVerifyEmailRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostVerifyEmail = (queryOptions?: UsePostVerifyOptions) =>
  useMutation(['verifyEmail'], postVerifyEmail, queryOptions);
