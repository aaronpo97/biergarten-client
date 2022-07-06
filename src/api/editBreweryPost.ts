import saveNewAccessTokenIfExists from './utils/saveNewAccessTokenIfExists';
import getAuthRequestHeaders from './utils/requestHeaders/authRequestHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

interface EditBreweryPostArgs {
   name?: string;
   description?: string;
   location?: string;
   phoneNumber?: string;
}
const editBreweryPost = async (
   id: string,
   { name, description, location, phoneNumber }: EditBreweryPostArgs,
) => {
   const body = JSON.stringify({
      name,
      description,
      location,
      phoneNumber,
   });

   const response = await fetch(`/api/breweries/${id}`, {
      method: 'PUT',
      headers: getAuthRequestHeaders(),
      body,
   });

   const data = (await response.json()) as
      | SuccessResponse<{ id: string }>
      | ErrorResponse;

   saveNewAccessTokenIfExists(data);

   return data;
};
export default editBreweryPost;
