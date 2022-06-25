import { CurrentUserState } from '../contexts/AuthContext';
import authHeaders from './utils/authHeaders';
import SuccessResponse from './utils/response/SuccessResponse';

const getCurrentAuthenticatedUser = async () => {
   const response = await fetch('/api/users/current-authenticated-user', { headers: authHeaders });
   const data = (await response.json()) as SuccessResponse<CurrentUserState>;

   return data.payload;
};
export default getCurrentAuthenticatedUser;
