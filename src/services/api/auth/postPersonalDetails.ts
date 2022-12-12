import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostPersonalDetailsRequest {
  memberKey: string;
  token: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  nationality: string;
  idOrPassport: string;
  address: string;
  dateOfBirth: string;
}

export const postPersonalDetails = async (
  personalDetailsData: IPostPersonalDetailsRequest
): Promise<any> => {
  const { data } = await axiosRequest('POST', '/api/Patient/SignUp/PersonalDetails', {
    data: personalDetailsData,
  });

  return data;
};
