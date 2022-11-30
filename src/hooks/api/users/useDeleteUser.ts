import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteUser, IDeleteUserRequest } from 'src/services/api/users/deleteUser';
import { IUserResponse } from 'src/services/api/users/getUsers';

type UseDeleteUserOptions = Omit<
  UseMutationOptions<IUserResponse, Error, IDeleteUserRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useDeleteUser = (queryOptions?: UseDeleteUserOptions) =>
  useMutation(['deleteUser'], deleteUser, queryOptions);
