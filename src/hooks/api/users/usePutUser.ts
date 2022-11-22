import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPutUserWithId, putUser } from 'src/services/users/putUser';

// After we have getUsers we need to swap any for IUserResponse

type UsePutUserOptions = Omit<
  UseMutationOptions<any, Error, IPutUserWithId, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutUser = (queryOptions?: UsePutUserOptions) =>
  useMutation(['updateUser'], putUser, queryOptions);
