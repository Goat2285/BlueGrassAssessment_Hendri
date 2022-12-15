import { axiosRequest } from 'src/services/axiosConfig';

export interface IPutPatientPartnerDetailsRequest {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  nationality: string;
  idOrPassport: string;
  address: string;
  dateOfBirth: string;
}

export const putPatientPartnerDetails = async (
  patientPartnerData: IPutPatientPartnerDetailsRequest
): Promise<any> => {
  const { data } = await axiosRequest('PUT', '/api/Patient/Profile/PartnerDetails', {
    data: patientPartnerData,
  });

  return data;
};
