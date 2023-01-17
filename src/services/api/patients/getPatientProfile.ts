import { axiosRequest } from 'src/services/axiosConfig';

export interface IGetPatientProfileResponse {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  nationality: string;
  idOrPassport: string;
  address: string;
  dateOfBirth: string;
  partner: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    nationality: string;
    idOrPassport: string;
    address: string;
    dateOfBirth: string;
  };
}

export const getPatientProfile = async (): Promise<IGetPatientProfileResponse> => {
  const { data } = await axiosRequest('GET', '/api/Patient/Profile');

  return data;
};
