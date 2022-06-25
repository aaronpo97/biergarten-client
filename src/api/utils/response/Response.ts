/**
 * The super class for both SuccessResponse and ErrorResponse.
 */

export default class Response {
   message: string;

   status: number;

   success: boolean;

   constructor(message: string, status: number, success: boolean) {
      this.message = message;
      this.status = status;
      this.success = success;
   }
}
