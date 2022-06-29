import BreweryPostI from '../types/BreweryPostI';
import getPostRequestHeaders from './utils/requestHeaders/postRequestHeaders';
import SuccessResponse from './utils/response/SuccessResponse';

const createBreweryPost = async (
   name: string,
   description: string,
   location: string,
   phoneNumber: string,
) => {
   const body = JSON.stringify({
      name,
      description,
      location,
      phoneNumber,
   });

   const response = await fetch('/api/breweries', {
      method: 'POST',
      headers: getPostRequestHeaders(),
      body,
   });

   return response.json() as Promise<SuccessResponse<{ id: string }>>;
};
export default createBreweryPost;
