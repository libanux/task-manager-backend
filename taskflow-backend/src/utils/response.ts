import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}


/*<T> in Function Declaration
typescript:
const sendSuccess = <T>
Meaning: "This function can work with any type T 


-data?: T
Meaning: "The data parameter should be of that same type T"


Without <T>, TypeScript wouldn't know what type data should be! 🎯

so <T> is for type savety.
*/

export const sendSuccess = <T>(res: Response, message: string, data?: T): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data
  };
  res.json(response);
};

export const sendError = (res: Response, message: string, statusCode: number = 500, error?: string): void => {
  const response: ApiResponse = {
    success: false,
    message,
    error
  };
  res.status(statusCode).json(response);
};

/*500 Internal Server Error means: "Something broke on the server side" 🚨 */