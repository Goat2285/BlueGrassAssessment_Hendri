import { axiosRequest } from 'src/services/axiosConfig';

export interface IPostPartnerDetailsRequest {
  memberKey: string;
  token: string;
  hasPartner: boolean;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  email?: string;
  nationality?: string;
  idOrPassport?: string;
  address?: string;
  dateOfBirth?: string;
}

export const postPartnerDetails = async (
  partnerDetailsData: IPostPartnerDetailsRequest
): Promise<any> => {
  const { data } = await axiosRequest('POST', '/api/Patient/SignUp/PartnerDetails', {
    data: partnerDetailsData,
  });

  return data;
};
