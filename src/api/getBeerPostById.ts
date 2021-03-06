import BeerPostI from '../types/BeerPostI';
import isValidUuid from '../util/isValidUuid';
import saveNewAccessTokenIfExists from './utils/saveNewAccessTokenIfExists';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getBeerPostById = async (id: string) => {
   if (!isValidUuid(id)) {
      throw new Error('Invalid id.');
   }

   const response = await fetch(`/api/beers/${id}`, {
      headers: getAuthHeaders(),
   });
   const data = (await response.json()) as
      | SuccessResponse<BeerPostI>
      | ErrorResponse;

   saveNewAccessTokenIfExists(data);
   return data;
};
export default getBeerPostById;
