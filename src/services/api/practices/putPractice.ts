import { axiosRequest } from 'src/services/axiosConfig';
import { IPracticeResponse } from './getPractices';

export interface IPutPracticeRequest {
  name: string;
  practiceNumber?: string;
  registrationNumber?: string;
  physicalAddress: string;
  email: string;
  telephone: string;
  status: boolean;
}

export interface IPutPracticeWithId {
  id: number;
  putData: IPutPracticeRequest;
}

export const putPractice = async (updateData: IPutPracticeWithId): Promise<IPracticeResponse> => {
  const { data } = await axiosRequest('PUT', `/api/Practice/${updateData.id}`, {
    data: updateData.putData,
  });

  return data;
};
