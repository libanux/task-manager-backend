import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'Access token required', 401);
      return;
    }

    const token = authHeader.split(' ')[1];// Takes the part after "Bearer "
    
    if (!token) {
      sendError(res, 'Invalid token format', 401);
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;/*la eno authMiddleware we are applying it  on 
    all tasks routes ,then all routes will have in there  
    req ha ykoun 3endon req.user,  */
    
    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token', 403);
  }
};