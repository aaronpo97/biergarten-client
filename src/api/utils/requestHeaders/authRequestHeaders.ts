const getAuthRequestHeaders = (): Headers => {
   const authRequestHeaders = new Headers();

   const accessToken = localStorage.getItem('accessToken') ?? '';
   const refreshToken = localStorage.getItem('refreshToken') ?? '';

   authRequestHeaders.append('Content-Type', 'application/json');
   authRequestHeaders.append('x-access-token', accessToken);
   authRequestHeaders.append('x-auth-token', refreshToken);

   return authRequestHeaders;
};

export default getAuthRequestHeaders;
