import formatISO from 'date-fns/formatISO';
import saveTokens from './utils/saveTokens';
import getPostRequestHeaders from './utils/requestHeaders/postRequestHeaders';
import SuccessResponse from './utils/response/SuccessResponse';

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
) => {
   const user = {
      username,
      email,
      password,
      dateOfBirth: formatISO(new Date(birthday)),
   };

   const method = 'POST';
   const headers = getPostRequestHeaders();
   const body = JSON.stringify(user);

   const response = await fetch('/api/users/register', {
      method,
      headers,
      body,
   });

   const data = (await response.json()) as SuccessResponse<RegisterUserPayload>;

   if (data.status === 200) {
      const { accessToken, user: registeredUser, refreshToken } = data.payload;
      saveTokens(accessToken, refreshToken, registeredUser.id);
   }

   return data;
};
export default registerUser;
