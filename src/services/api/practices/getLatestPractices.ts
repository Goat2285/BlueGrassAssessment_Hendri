import { axiosRequest } from 'src/services/axiosConfig';
import { IPracticeResponse } from './getPractices';

export interface IGetLatestPracticesRequest {
  count: number;
}

export const getLatestPractices = async (
  practicesCount: IGetLatestPracticesRequest
): Promise<IPracticeResponse[]> => {
  const { data } = await axiosRequest(
    'GET',
    `/api/Practice/latest/practices?count=${practicesCount.count}`
  );

  return data;
};
