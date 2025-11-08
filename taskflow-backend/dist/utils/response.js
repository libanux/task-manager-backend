"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
/*<T> in Function Declaration
typescript:
const sendSuccess = <T>
Meaning: "This function can work with any type T


-data?: T
Meaning: "The data parameter should be of that same type T"


Without <T>, TypeScript wouldn't know what type data should be! 🎯

so <T> is for type savety.
*/
const sendSuccess = (res, message, data) => {
    const response = {
        success: true,
        message,
        data
    };
    res.json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500, error) => {
    const response = {
        success: false,
        message,
        error
    };
    res.status(statusCode).json(response);
};
exports.sendError = sendError;
/*500 Internal Server Error means: "Something broke on the server side" 🚨 */ 
