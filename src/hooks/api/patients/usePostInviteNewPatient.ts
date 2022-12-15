import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostInviteNewPatientRequest,
  IPostInviteNewPatientResponse,
  postInviteNewPatient,
} from 'src/services/api/patients/postInviteNewPatient';

type UsePostInviteNewPatientOptions = Omit<
  UseMutationOptions<
    IPostInviteNewPatientResponse,
    Error,
    IPostInviteNewPatientRequest,
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const usePostInviteNewPatient = (queryOptions?: UsePostInviteNewPatientOptions) =>
  useMutation(['postInviteNewPatient'], postInviteNewPatient, queryOptions);
