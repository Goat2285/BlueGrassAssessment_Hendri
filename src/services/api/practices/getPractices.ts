import { axiosRequest } from "src/services/axiosConfig";


export interface IPracticeResponse {
  name?: string;
  email?: string;
  physicalAddress?: string;
  practiceNumber?: string;
  registrationNumber?: string;
  status: boolean;
  telephone?: string;
  id: BigInteger;
  createDate: string;
}

export const getPractices = async (): Promise<IPracticeResponse[]> => {
  const { data } = await axiosRequest('GET', '/api/Practice');
  return data;
}