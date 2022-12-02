import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';
import { IPutPracticeWithId, putPractice } from 'src/services/api/practices/putPractice';

type UsePutPracticeOptions = Omit<
  UseMutationOptions<IPracticeResponse, Error, IPutPracticeWithId, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutPractice = (queryOptions?: UsePutPracticeOptions) =>
  useMutation(['updatePractice'], putPractice, queryOptions);
