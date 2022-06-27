import BeerPostI from '../types/BeerPostI';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getAllBeerPosts = async (pageNum?: number, pageSize?: number) => {
   const url = `/api/beers?page_num=${pageNum || 1}&page_size=${
      pageSize || 10
   }`;

   const headers = getAuthHeaders();

   const response = await fetch(url, { headers });
   const data = (await response.json()) as
      | SuccessResponse<{
           pageNum: number;
           pageSize: number;
           allBeers: BeerPostI[];
        }>
      | ErrorResponse;
   if ('newAccessToken' in data && data.newAccessToken) {
      localStorage.setItem('accessToken', data.newAccessToken);
   }

   return data;
};
export default getAllBeerPosts;
