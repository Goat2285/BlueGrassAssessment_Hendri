import { axiosRequest } from 'src/services/axiosConfig';
import { IUserResponse } from './getUsers';

export interface IPostUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const postUser = async (userData: IPostUserRequest): Promise<IUserResponse> => {
  const { data } = await axiosRequest('POST', '/api/Clinic/User/Create', {
    data: userData,
  });

  return data;
};
