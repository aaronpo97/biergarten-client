import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const checkIfUsernameExists = async (username: string) => {
   const response = await fetch(
      `/api/users/check-if-username-exists?username=${username}`,
   );

   const data = (await response.json()) as
      | SuccessResponse<{ usernameTaken: boolean; username: string }>
      | ErrorResponse;
   return data;
};
export default checkIfUsernameExists;
