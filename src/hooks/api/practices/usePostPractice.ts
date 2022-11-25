import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';
import { IPostPracticeRequest, postPractice } from 'src/services/api/practices/postPractice';

type UsePostPracticeOptions = Omit<
  UseMutationOptions<IPracticeResponse, Error, IPostPracticeRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePostPractice = (queryOptions?: UsePostPracticeOptions) =>
  useMutation(['postPractice'], postPractice, queryOptions);
