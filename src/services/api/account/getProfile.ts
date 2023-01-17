import { axiosRequest } from 'src/services/axiosConfig';

export interface IGetProfileResponse {
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
  profilePictureUrl?: string | null;
}

export const getProfile = async (): Promise<IGetProfileResponse> => {
  const { data } = await axiosRequest('GET', '/api/Account/User/profile');

  return data;
};
