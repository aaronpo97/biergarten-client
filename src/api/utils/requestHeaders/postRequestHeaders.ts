const getPostRequestHeaders = (): Headers => {
   const postRequestHeaders = new Headers();

   const accessToken = localStorage.getItem('accessToken') ?? '';
   const refreshToken = localStorage.getItem('refreshToken') ?? '';

   postRequestHeaders.append('Content-Type', 'application/json');
   postRequestHeaders.append('x-access-token', accessToken);
   postRequestHeaders.append('x-auth-token', refreshToken);

   return postRequestHeaders;
};

export default getPostRequestHeaders;
