import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IUserResponse } from 'src/services/api/users/getUsers';
import { IPostUserRequest, postUser } from 'src/services/api/users/postUser';

type UsePostUserOptions = Omit<
  UseMutationOptions<IUserResponse, Error, IPostUserRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostUser = (queryOptions?: UsePostUserOptions) =>
  useMutation(['postUser'], postUser, queryOptions);
