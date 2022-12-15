import { axiosRequest } from 'src/services/axiosConfig';

export interface IPracticeResponse {
  name?: string;
  email?: string;
  physicalAddress?: string;
  practiceNumber?: string;
  registrationNumber?: string;
  status: boolean;
  telephone?: string;
  id: number;
  createDate: string;
  adminFirstname: string;
  adminLastname: string;
  adminEmail: string;
}

export const getPractices = async (): Promise<IPracticeResponse[]> => {
  const { data } = await axiosRequest('GET', '/api/Practice');
  return data;
};
