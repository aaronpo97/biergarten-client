import BeerPostI from '../types/BeerPostI';
import authHeaders from './utils/authHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getAllBeerPosts = async (pageNum?: number, pageSize?: number) => {
   const url = `/api/beers?page_num=${pageNum || 1}&page_size=${pageSize || 10}`;
   const response = await fetch(url, { headers: authHeaders });
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
