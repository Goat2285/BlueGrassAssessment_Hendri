import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { IPostUserRequest, postUser } from "src/services/api/users/postUser";

// After creating getUsers service swap any with IPostUserResponse

type UsePostUserOptions = Omit<UseMutationOptions<any, Error, IPostUserRequest, Array<string>>, 'queryKey' | 'queryFn'>;

export const usePostUser = ( queryOptions?: UsePostUserOptions ) => useMutation(['postUser'], postUser, queryOptions)