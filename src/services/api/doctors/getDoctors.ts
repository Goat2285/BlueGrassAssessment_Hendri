import { axiosRequest } from 'src/services/axiosConfig';

export interface IGetDoctorResponse {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  roles: string[];
  practiceNumber: string;
  practiceName: string;
}

export const getDoctors = async (): Promise<IGetDoctorResponse[]> => {
  const { data } = await axiosRequest('GET', '/api/Clinic/doctors');

  return data;
};
