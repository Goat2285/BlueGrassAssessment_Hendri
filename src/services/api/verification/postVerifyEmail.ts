import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostVerifyEmailRequest {
  email: string;
  verificationCode: string;
}

export const postVerifyEmail = async (verifyData: IPostVerifyEmailRequest): Promise<any> => {
  const { data } = await axiosRequest('POST', '/api/Patient/VerifyEmail', {
    data: verifyData,
  });

  return data;
};
