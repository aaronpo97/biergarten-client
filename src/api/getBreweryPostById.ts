import BreweryPostI from '../types/BreweryPostI';
import isValidUuid from '../util/isValidUuid';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getBreweryPostById = async (id: string) => {
   if (!isValidUuid(id)) {
      throw new Error('Invalid id.');
   }

   const response = await fetch(`/api/breweries/${id}`, {
      headers: getAuthHeaders(),
   });

   return response.json() as Promise<
      SuccessResponse<BreweryPostI> | ErrorResponse
   >;
};
export default getBreweryPostById;
