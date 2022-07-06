import BeerCommentI from '../types/BeerCommentI';
import saveNewAccessTokenIfExists from './utils/saveNewAccessTokenIfExists';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getBeerPostComments = async (id: string) => {
   const url = `/api/beers/${id}/comments`;
   const response = await fetch(url, { headers: getAuthHeaders() });
   const data = (await response.json()) as
      | SuccessResponse<BeerCommentI[]>
      | ErrorResponse;

   saveNewAccessTokenIfExists(data);
   return data;
};
export default getBeerPostComments;
