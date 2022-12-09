import { axiosRequest } from 'src/services/axiosConfig';
import { IPracticeResponse } from './getPractices';

export interface IPostPracticeRequest {
  name: string;
  practiceNumber?: string;
  registrationNumber?: string;
  physicalAddress: string;
  email: string;
  telephone: string;
  status: boolean;
  adminFirstname: string;
  adminLastname: string;
  adminEmail: string;
}

export const postPractice = async (
  practiceData: IPostPracticeRequest
): Promise<IPracticeResponse> => {
  const { data } = await axiosRequest('POST', '/api/Practice', {
    data: practiceData,
  });

  return data;
};
