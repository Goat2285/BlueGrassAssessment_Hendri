import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostCreatePasswordRequest {
  password: string;
  confirmpassword: string;
  memberKey: string;
  token: string;
}

export const postCreatePassword = async (postData: IPostCreatePasswordRequest) => {
  const { data } = await axiosRequest('POST', '/api/Patient/SignUp/CreatePassword', {
    data: postData,
  });

  return data;
};
