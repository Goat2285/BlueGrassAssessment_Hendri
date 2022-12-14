import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';
import { IPostStatusRequest, postStatus } from 'src/services/api/practices/postStatus';

type UsePostStatusOptions = Omit<
  UseMutationOptions<IPracticeResponse, Error, IPostStatusRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostStatus = (queryOptions?: UsePostStatusOptions) =>
  useMutation(['postStatus'], postStatus, queryOptions);
