import ErrorResponse from './utils/response/ErrorResponse';
import SuccessResponse from './utils/response/SuccessResponse';

const loginUser = async (username: string, password: string) => {
   try {
      const requestOptions = {
         body: JSON.stringify({ username: username.toLowerCase(), password }),
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
      };
      const response = await fetch('/api/users/login', requestOptions);
      return response.json() as Promise<
         SuccessResponse<{ id: string; refreshToken: string; accessToken: string }> | ErrorResponse
      >;
   } catch (err) {
      return {
         status: 400,
         message: 'Connection to server failed.',
         success: false,
      };
   }
};

export default loginUser;
