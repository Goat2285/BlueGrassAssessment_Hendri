import { axiosRequest } from 'src/services/axiosConfig';
import { IPracticeResponse } from './getPractices';

export interface IDeletePracticeRequest {
  id: number;
}

export const deletePractice = async (
  deletePractice: IDeletePracticeRequest
): Promise<IPracticeResponse> => {
  const { data } = await axiosRequest('DELETE', `/api/Practice/${deletePractice.id}`);

  return data;
};
