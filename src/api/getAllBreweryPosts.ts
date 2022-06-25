import BreweryPostI from '../types/BreweryPostI';
import authHeaders from './utils/authHeaders';

interface SuccessResponse {
   message: string;
   status: 200;
   payload: BreweryPostI[];
}
const getAllBreweryPosts = async (pageNum?: number, pageSize?: number): Promise<SuccessResponse> => {
   const response = await fetch(`/api/breweries?page_num=${pageNum || 1}&page_size=${pageSize || 5}`, {
      headers: authHeaders,
   });

   return response.json() as Promise<SuccessResponse>;
};

export default getAllBreweryPosts;
