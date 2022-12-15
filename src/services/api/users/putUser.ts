import { axiosRequest } from 'src/services/axiosConfig';
import { IUserResponse } from './getUsers';

export interface IPutUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface IPutUserWithId {
  id: number;
  putData: IPutUserRequest;
}

export const putUser = async (updateData: IPutUserWithId): Promise<IUserResponse> => {
  const { data } = await axiosRequest('PUT', `/api/Clinic/User/Update/${updateData.id}`, {
    data: updateData.putData,
  });

  return data;
};
