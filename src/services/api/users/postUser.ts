import { axiosRequest } from "src/services/axiosConfig";

export interface IPostUserRequest {
  email: string;
  fullname: string;
  role: string;
}

// After creating getUsers service swap any with IPostUserResponse

export const postUser = async ( userData: IPostUserRequest ): Promise<any> => {
  const { data } = await axiosRequest('POST', '/api/Clinic/Users', {
    data: userData
  });

  return data;
}