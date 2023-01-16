import { CustomFile } from 'src/components/upload';
import { axiosRequest } from 'src/services/axiosConfig';

export interface IPutProfileRequest {
  firstname: string;
  lastname: string;
  email: string;
  profilePicture?: CustomFile | string | null;
}

export const putProfile = async (updateData: IPutProfileRequest): Promise<any> => {
  const { data } = await axiosRequest('PUT', '/api/Account/User/profile', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: updateData,
  });

  return data;
};
