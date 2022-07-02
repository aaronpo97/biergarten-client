import formatISO from 'date-fns/formatISO';
import saveTokens from './utils/saveTokens';
import getPostRequestHeaders from './utils/requestHeaders/postRequestHeaders';
import SuccessResponse from './utils/response/SuccessResponse';
import ErrorResponse from './utils/response/ErrorResponse';

interface RegisterUserPayload {
   user: { id: string; username: string };
   accessToken: string;
   refreshToken: string;
}
const registerUser = async (
   username: string,
   email: string,
   birthday: string,
   password: string,
   firstName: string,
   lastName: string,
) => {
   const user = {
      username,
      email,
      password,
      dateOfBirth: formatISO(new Date(birthday)),
      firstName,
      lastName,
   };

   const method = 'POST';
   const headers = getPostRequestHeaders();
   const body = JSON.stringify(user);

   const response = await fetch('/api/users/register', {
      method,
      headers,
      body,
   });

   const data = (await response.json()) as
      | SuccessResponse<RegisterUserPayload>
      | ErrorResponse;

   if ('payload' in data) {
      const { accessToken, user: registeredUser, refreshToken } = data.payload;
      saveTokens({ accessToken, refreshToken, userId: registeredUser.id });
   }

   return data;
};
export default registerUser;
