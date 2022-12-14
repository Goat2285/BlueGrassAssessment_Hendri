import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPostUpdatePassword, postUpdatePassword } from 'src/services/api/auth/postUpdatePassword';

type UsePostUpdatePasswordOptions = Omit<
  UseMutationOptions<any, Error, IPostUpdatePassword, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostUpdatePassword = (queryOptions?: UsePostUpdatePasswordOptions) =>
  useMutation(['postUpdatePassword'], postUpdatePassword, queryOptions);
