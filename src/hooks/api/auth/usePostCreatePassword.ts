import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostCreatePasswordRequest,
  postCreatePassword,
} from 'src/services/api/auth/postCreatePassword';

type UsePostCreatePasswordOptions = Omit<
  UseMutationOptions<any, Error, IPostCreatePasswordRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostCreatePassword = (queryOptions?: UsePostCreatePasswordOptions) =>
  useMutation(['postPartnerDetails'], postCreatePassword, queryOptions);
