import saveNewAccessTokenIfExists from './utils/saveNewAccessTokenIfExists';
import getAuthRequestHeaders from './utils/requestHeaders/authRequestHeaders';
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
      headers: getAuthRequestHeaders(),
      body: JSON.stringify(args),
   });

   const data = (await response.json()) as
      | SuccessResponse<{ id: string }>
      | ErrorResponse;

   saveNewAccessTokenIfExists(data);

   return data;
};
export default createBeerPost;
