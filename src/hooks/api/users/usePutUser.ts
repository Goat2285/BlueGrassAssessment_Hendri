import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IUserResponse } from 'src/services/api/users/getUsers';
import { IPutUserWithId, putUser } from 'src/services/api/users/putUser';

type UsePutUserOptions = Omit<
  UseMutationOptions<IUserResponse, Error, IPutUserWithId, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutUser = (queryOptions?: UsePutUserOptions) =>
  useMutation(['updateUser'], putUser, queryOptions);
