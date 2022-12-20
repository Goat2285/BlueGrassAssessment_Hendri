import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPutProfileRequest, putProfile } from 'src/services/api/account/putProfile';

type UsePutProfileOptions = Omit<
  UseMutationOptions<any, Error, IPutProfileRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutProfile = (queryOptions?: UsePutProfileOptions) =>
  useMutation(['updateProfile'], putProfile, queryOptions);
