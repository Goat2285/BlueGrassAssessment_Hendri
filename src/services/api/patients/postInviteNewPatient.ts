import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostInviteNewPatientRequest {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  doctorId: number;
  redirectUrl: string;
}

export interface IPostInviteNewPatientResponse {
  redirectUrl: string;
}

export const postInviteNewPatient = async (
  patientData: IPostInviteNewPatientRequest
): Promise<IPostInviteNewPatientResponse> => {
  const { data } = await axiosRequest('POST', '/api/Clinic/patient/invite', {
    data: patientData,
  });

  return data;
};
