import { axiosRequest } from '../../axiosConfig';

export interface IUserResponse {
  id: number;
  avatar?: string;
  name: string;
  userName: string;
  email: string;
  createDate: string;
  roles: string[];
}

export const getUsers = async (): Promise<IUserResponse[]> => {
  const { data } = await axiosRequest('GET', '/api/Clinic/Users');

  return data;
};
