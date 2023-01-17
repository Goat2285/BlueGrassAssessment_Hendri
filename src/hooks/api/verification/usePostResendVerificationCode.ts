import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostResendVerificationCodeRequest,
  postResendVerificationCode,
} from 'src/services/api/verification/postResendVerificationCode';

type UsePostResendVerificationCodeOptions = Omit<
  UseMutationOptions<any, Error, IPostResendVerificationCodeRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostResendVerificationCode = (
  queryOptions?: UsePostResendVerificationCodeOptions
) => useMutation(['resendVerificationCode'], postResendVerificationCode, queryOptions);
