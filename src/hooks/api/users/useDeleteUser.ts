import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteUser, IDeleteUserRequest } from 'src/services/api/users/deleteUser';

// After we have getUsers we need to swap any for IUserResponse

type UseDeleteUserOptions = Omit<
  UseMutationOptions<any, Error, IDeleteUserRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useDeleteUser = (queryOptions?: UseDeleteUserOptions) =>
  useMutation(['deleteUser'], deleteUser, queryOptions);
