const saveTokens = (tokens: {
   accessToken: string;
   refreshToken: string;
   userId: string;
}) => {
   const { accessToken, refreshToken, userId } = tokens;
   localStorage.setItem('accessToken', accessToken);
   localStorage.setItem('refreshToken', refreshToken);
   localStorage.setItem('userId', userId);
};
export default saveTokens;
