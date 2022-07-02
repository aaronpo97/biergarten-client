import getPostRequestHeaders from './utils/requestHeaders/postRequestHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

interface CreateBeerPostArgs {
   name: string;
   description: string;
   abv: number;
   ibu: number;
   breweryId: string;
   type: string;
}
const createBeerPost = async (args: CreateBeerPostArgs) => {
   const response = await fetch('/api/beers', {
      method: 'POST',
      headers: getPostRequestHeaders(),
      body: JSON.stringify(args),
   });

   return response.json() as Promise<
      SuccessResponse<{ id: string }> | ErrorResponse
   >;
};
export default createBeerPost;
