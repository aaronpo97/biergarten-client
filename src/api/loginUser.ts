interface SuccessResponse {
   message: 'Successfully logged in.';
   status: 200;
   success: true;
   payload: { id: string; refreshToken: string; accessToken: string };
}

interface ErrorResponse {
   status: 400;
   message: string;
   success: false;
   details?: unknown[];
   stack?: string;
}

const loginUser = async (username: string, password: string): Promise<SuccessResponse | ErrorResponse> => {
   try {
      const requestOptions = {
         body: JSON.stringify({ username: username.toLowerCase(), password }),
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
      };
      const response = await fetch('/api/users/login', requestOptions);
      return response.json() as Promise<SuccessResponse | ErrorResponse>;
   } catch (err) {
      return {
         status: 400,
         message: 'Connection to server failed.',
         success: false,
      };
   }
};

export default loginUser;
