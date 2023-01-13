import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostUpdatePassword {
  password: string;
  confirmPassword: string;
}

export const postUpdatePassword = async (updatePassword: IPostUpdatePassword): Promise<any> => {
  const { data } = await axiosRequest('POST', '/api/Account/UpdatePassword', {
    data: updatePassword,
  });

  return data;
};
