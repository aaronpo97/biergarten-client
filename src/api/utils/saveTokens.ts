const saveTokens = (accessToken: string, refreshToken: string, userId: string) => {
   localStorage.setItem('accessToken', accessToken);
   localStorage.setItem('refreshToken', refreshToken);
   localStorage.setItem('userId', userId);
};
export default saveTokens;
