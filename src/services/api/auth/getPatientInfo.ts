import { axiosRequest } from 'src/services/axiosConfig';

export interface IGetPatientInfoRequest {
  memberKey: string;
  token: string;
}

export interface IGetPatientInfoResponse {
  dateOfBirth: string;
  partnerDateOfBirth: string;
  id: number;
  address: string;
  contactNumber: string;
  email: string;
  firstName: string;
  idOrPassport: string;
  lastName: string;
  nationality: string;
  partnerAddress: string;
  partnerContactNumber: string;
  partnerEmail: string;
  partnerFirstName: string;
  partnerIdOrPassport: string;
  partnerLastName: string;
  partnerNationality: string;
  token: string;
  roles: string[];
  key: string;
}

export const getPatientInfo = async (validData: IGetPatientInfoRequest) => {
  const { data } = await axiosRequest(
    'GET',
    `/api/Patient/SignUp?memberKey=${validData.memberKey}&token=${validData.token}`
  );

  return data;
};
