import { axiosRequest } from 'src/services/axiosConfig';

export interface IPutPatientPersonalDetailsRequest {
  firstName: string;
  lastName: string;
  contactNumber: string;
  nationality: string;
  idOrPassport: string;
  address: string;
  dateOfBirth: string;
}

export const putPatientPersonalDetails = async (
  patientPersonalData: IPutPatientPersonalDetailsRequest
): Promise<any> => {
  const { data } = await axiosRequest('PUT', '/api/Patient/Profile/PersonalDetails', {
    data: patientPersonalData,
  });

  return data;
};
