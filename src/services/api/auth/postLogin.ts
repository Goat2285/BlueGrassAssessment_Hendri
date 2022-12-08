import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostLoginResponse {
  fullname: string;
  userName: string;
  email: string;
  createDate: string;
  roles: string[];
  errors: string | null;
  isSuccess: boolean;
  title: string | null;
}

export interface IPostLoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const login = async (loginData: IPostLoginRequest): Promise<IPostLoginResponse> => {
  const { data } = await axiosRequest('POST', '/api/Account/SignIn', {
    data: loginData,
  });

  return data;
};
