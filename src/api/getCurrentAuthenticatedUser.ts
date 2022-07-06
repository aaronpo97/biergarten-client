import { CurrentUserState } from '../contexts/AuthContext';
import getAuthHeaders from './utils/requestHeaders/getAuthHeaders';
import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const getCurrentAuthenticatedUser = async () => {
   const response = await fetch('/api/users/current-authenticated-user', {
      headers: getAuthHeaders(),
   });
   const data = (await response.json()) as
      | SuccessResponse<CurrentUserState>
      | ErrorResponse;

   return data;
};
export default getCurrentAuthenticatedUser;
