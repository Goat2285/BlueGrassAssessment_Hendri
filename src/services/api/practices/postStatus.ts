import { axiosRequest } from 'src/services/axiosConfig';
import { IPracticeResponse } from './getPractices';

export interface IPostStatusRequest {
  status: boolean;
  id: number;
}

export const postStatus = async (statusData: IPostStatusRequest): Promise<IPracticeResponse> => {
  const { data } = await axiosRequest(
    'POST',
    `/api/Practice/UpdateStatus?id=${statusData.id}&status=${statusData.status}`
  );

  return data;
};
