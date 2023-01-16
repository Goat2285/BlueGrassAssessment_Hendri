import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostResendVerificationCodeRequest {
  email: string;
}

export const postResendVerificationCode = async (
  verifyData: IPostResendVerificationCodeRequest
): Promise<any> => {
  const { data } = await axiosRequest('POST', '/api/Patient/ResendVerificationCode', {
    data: verifyData,
  });

  return data;
};
