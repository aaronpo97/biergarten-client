import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';
import saveTokens from './utils/saveTokens';

const loginUser = async (username: string, password: string) => {
   try {
      const requestOptions = {
         body: JSON.stringify({ username: username.toLowerCase(), password }),
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
      };
      const response = await fetch('/api/users/login', requestOptions);
      const data = (await response.json()) as
         | SuccessResponse<{
              id: string;
              refreshToken: string;
              accessToken: string;
           }>
         | ErrorResponse;

      if ('payload' in data) {
         const { accessToken, refreshToken, id } = data.payload;
         saveTokens({ accessToken, refreshToken, userId: id });
      }
      return data;
   } catch (err) {
      return {
         status: 400,
         message: 'Connection to server failed.',
         success: false,
      };
   }
};

export default loginUser;
