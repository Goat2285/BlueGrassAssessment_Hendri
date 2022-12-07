import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostForgotPassword {
  email: string;
  resetUrl: string;
}

export const postForgotPassword = async (postData: IPostForgotPassword) => {
  const { data } = await axiosRequest(
    'POST',
    `/api/Account/ForgotPassword?email=${postData.email}&resetUrl=${postData.resetUrl}`
  );

  return data;
};
