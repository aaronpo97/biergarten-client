import BeerPostI from '../types/BeerPostI';
import isValidUuid from '../util/isValidUuid';

interface SuccessResponse {
   message: string;
   status: 200;
   success: true;
   payload: BeerPostI;
   newAccessToken?: string;
}

interface ErrorResponse {
   message: string;
   status: number;
   success: false;
}

const getBeerPostById = async (id: string) => {
   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken');

   if (!isValidUuid) {
      throw new Error('Invalid id.');
   }

   if (!(accessToken && refreshToken)) {
      throw new Error('Cannot authenticate user.');
   }

   const headers = new Headers();
   headers.append('x-access-token', accessToken);
   headers.append('x-auth-token', refreshToken);

   const response = await fetch(`/api/beers/${id}`, { headers });
   return response.json() as Promise<SuccessResponse | ErrorResponse>;
};
export default getBeerPostById;
