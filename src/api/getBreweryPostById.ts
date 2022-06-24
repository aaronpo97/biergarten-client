import BreweryPostI from '../types/BreweryPostI';
import isValidUuid from '../util/isValidUuid';
import authHeaders from './authHeaders';
import ErrorResponse from './utils/ErrorResponse';
import SuccessResponse from './utils/SuccessResponse';

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
