import { axiosRequest } from 'src/services/axiosConfig';

export interface IPutUserRequest {
  fullname: string;
  email: string;
  role: string;
}

export interface IPutUserWithId {
  id: number;
  putData: IPutUserRequest;
}

// After we have getUsers we need to swap any for IUserResponse

export const putUser = async (updateData: IPutUserWithId): Promise<any> => {
  const { data } = await axiosRequest('PUT', `/api/Clinic/User/Update/${updateData.id}`, {
    data: updateData.putData,
  });

  return data;
};
