import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deletePractice, IDeletePracticeRequest } from 'src/services/api/practices/deletePractice';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';

type UseDeletePracticeOptions = Omit<
  UseMutationOptions<IPracticeResponse, Error, IDeletePracticeRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useDeletePractice = (queryOptions?: UseDeletePracticeOptions) =>
  useMutation(['deletePractice'], deletePractice, queryOptions);
