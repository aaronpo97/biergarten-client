import ErrorResponse from './response/ErrorResponse';
import SuccessResponse from './response/SuccessResponse';

const saveNewAccessTokenIfExists = (
   data: SuccessResponse<unknown> | ErrorResponse,
) => {
   if ('newAccessToken' in data && data.newAccessToken) {
      localStorage.setItem('accessToken', data.newAccessToken);
   }
   return data;
};
export default saveNewAccessTokenIfExists;
