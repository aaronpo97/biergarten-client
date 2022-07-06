import BreweryPostI from '../types/BreweryPostI';
import saveNewAccessTokenIfExists from './utils/saveNewAccessTokenIfExists';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

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

   const data = (await response.json()) as
      | SuccessResponse<BreweryPostI[]>
      | ErrorResponse;

   saveNewAccessTokenIfExists(data);

   return data;
};

export default getAllBreweryPosts;
