import BeerPostI from '../types/BeerPostI';
import isValidUuid from '../util/isValidUuid';
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
   return response.json() as Promise<
      SuccessResponse<BeerPostI> | ErrorResponse
   >;
};
export default getBeerPostById;
