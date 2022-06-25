import BreweryPostI from '../types/BreweryPostI';
import isValidUuid from '../util/isValidUuid';
import authHeaders from './utils/authHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getBreweryPostById = async (id: string) => {
   if (!isValidUuid(id)) {
      throw new Error('Invalid id.');
   }

   const response = await fetch(`/api/breweries/${id}`, {
      headers: authHeaders,
   });

   return response.json() as Promise<SuccessResponse<BreweryPostI> | ErrorResponse>;
};
export default getBreweryPostById;
