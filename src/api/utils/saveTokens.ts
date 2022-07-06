const saveTokens = (tokens: {
   accessToken?: string;
   refreshToken?: string;
   userId?: string;
}) => {
   const { accessToken, refreshToken, userId } = tokens;

   if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
   }
   if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
   }
   if (userId) {
      localStorage.setItem('userId', userId);
   }
};
export default saveTokens;
