import BreweryPostI from '../types/BreweryPostI';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';

interface SuccessResponse {
   message: string;
   status: 200;
   payload: BreweryPostI[];
}

const getAllBreweryPosts = async ({
   paginated = false,
   pageNum = 1,
   pageSize = 5,
}) => {
   const url = paginated
      ? `/api/breweries?page_num=${pageNum}&page_size=${pageSize}`
      : '/api/breweries';

   const response = await fetch(url, {
      headers: getAuthHeaders(),
   });

   return response.json() as Promise<SuccessResponse | ErrorResponse>;
};

export default getAllBreweryPosts;
