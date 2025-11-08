"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            (0, response_1.sendError)(res, 'Access token required', 401);
            return;
        }
        const token = authHeader.split(' ')[1]; // Takes the part after "Bearer "
        if (!token) {
            (0, response_1.sendError)(res, 'Invalid token format', 401);
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded; /*la eno authMiddleware we are applying it  on
        all tasks routes ,then all routes will have in there
        req ha ykoun 3endon req.user,  */
        next();
    }
    catch (error) {
        (0, response_1.sendError)(res, 'Invalid or expired token', 403);
    }
};
exports.authMiddleware = authMiddleware;
