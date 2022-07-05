import saveNewAccessTokenIfExists from './utils/saveNewAccessTokenIfExists';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const checkIfEmailExists = async (email: string) => {
   const response = await fetch(
      `/api/users/check-if-email-exists?email=${email}`,
   );

   const data = (await response.json()) as
      | SuccessResponse<{ emailTaken: boolean; email: string }>
      | ErrorResponse;

   saveNewAccessTokenIfExists(data);
   return data;
};
export default checkIfEmailExists;
