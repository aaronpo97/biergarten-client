import getPostRequestHeaders from './utils/requestHeaders/postRequestHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

interface CreateBreweryPostArgs {
   name: string;
   description: string;
   location: string;
   phoneNumber: string;
}
const createBreweryPost = async ({
   name,
   description,
   location,
   phoneNumber,
}: CreateBreweryPostArgs) => {
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

   return response.json() as Promise<
      SuccessResponse<{ id: string }> | ErrorResponse
   >;
};
export default createBreweryPost;
