import { axiosRequest } from 'src/services/axiosConfig';
import { IUserResponse } from './getUsers';

export interface IDeleteUserRequest {
  id: number;
}

export const deleteUser = async (deleteData: IDeleteUserRequest): Promise<IUserResponse> => {
  const { data } = await axiosRequest('DELETE', `/api/Clinic/User/Delete/${deleteData.id}`, {
    data: deleteData.id,
  });
  return data;
};
