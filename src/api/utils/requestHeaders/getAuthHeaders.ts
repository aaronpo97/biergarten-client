const getAuthHeaders = (): Headers => {
   const accessToken = localStorage.getItem('accessToken') ?? '';
   const refreshToken = localStorage.getItem('refreshToken') ?? '';

   const authHeaders = new Headers();
   authHeaders.append('x-access-token', accessToken);
   authHeaders.append('x-auth-token', refreshToken);
   return authHeaders;
};

export default getAuthHeaders;
