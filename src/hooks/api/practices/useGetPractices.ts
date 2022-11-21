import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPractices, IPracticeResponse } from "src/services/api/practices/getPractices";

type UseGetPracticesOptions = Omit<UseQueryOptions<
IPracticeResponse[], Error, IPracticeResponse[], Array<string>>, 'queryKey' | 'queryFn'>;

export const useGetPractices = (queryOptions?: UseGetPracticesOptions) => useQuery(['getPractices'], getPractices, queryOptions)