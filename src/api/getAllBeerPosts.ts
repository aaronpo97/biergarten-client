import BeerPostI from '../types/BeerPostI';

interface SuccessResponse {
   message: string;
   status: 200;
   success: true;
   payload: { pageNum: number; pageSize: number; allBeers: BeerPostI[] };
   newAccessToken?: string;
}

const getAllBeerPosts = async (pageNum?: number, pageSize?: number) => {
   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken');

   if (!(accessToken && refreshToken)) {
      throw new Error('Cannot access resource.');
   }

   const headers = new Headers();
   headers.append('x-access-token', accessToken);
   headers.append('x-auth-token', refreshToken);

   const url = `/api/beers?page_num=${pageNum || 1}&page_size=${pageSize || 10}`;
   const response = await fetch(url, { headers });
   const data = (await response.json()) as SuccessResponse;
   if (data.newAccessToken) {
      localStorage.setItem('accessToken', data.newAccessToken);
   }

   return data;
};
export default getAllBeerPosts;
