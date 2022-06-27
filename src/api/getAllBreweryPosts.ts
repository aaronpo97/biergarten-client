import BreweryPostI from '../types/BreweryPostI';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';

interface SuccessResponse {
   message: string;
   status: 200;
   payload: BreweryPostI[];
}
const getAllBreweryPosts = async (
   pageNum?: number,
   pageSize?: number,
): Promise<SuccessResponse> => {
   const response = await fetch(
      `/api/breweries?page_num=${pageNum || 1}&page_size=${pageSize || 5}`,
      {
         headers: getAuthHeaders(),
      },
   );

   return response.json() as Promise<SuccessResponse>;
};

export default getAllBreweryPosts;
