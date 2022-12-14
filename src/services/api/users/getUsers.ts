import { axiosRequest } from 'src/services/axiosConfig';

// We need id, avatar in schema so we can update and delete user - waitnig on Enkosi to implement that

export interface IUserResponse {
  id: number;
  profilePictureUrl?: string;
  firstname: string;
  lastname: string;
  userName: string;
  email: string;
  createDate: string;
  roles: string[];
}

export const getUsers = async (): Promise<IUserResponse[]> => {
  const { data } = await axiosRequest('GET', '/api/Clinic/Users');

  return data;
};
