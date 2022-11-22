import { axiosRequest } from 'src/services/axiosConfig';

export const getRoles = async (): Promise<string[]> => {
  const { data } = await axiosRequest('GET', '/roles');

  return data;
};
