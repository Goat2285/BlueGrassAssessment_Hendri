import { axiosRequest } from '../axiosConfig';

export interface IDeleteUserRequest {
  id: number;
}

// When we have a getUsers that swap any with IUserResponse

export const deleteUser = async (deleteData: IDeleteUserRequest): Promise<any> => {
  const { data } = await axiosRequest('DELETE', `/api/Clinic/User/Delete/${deleteData.id}`, {
    data: deleteData.id,
  });
  return data;
};
