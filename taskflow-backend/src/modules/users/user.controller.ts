import { Request, Response } from 'express';
import { UserService } from './user.service';
import { sendSuccess, sendError } from '../../utils/response';

const userService = new UserService();

export class UserController {
  
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      // Validation
      if (!name || !email || !password) {
        sendError(res, 'Name, email and password are required', 400);
        return;
      }

      const authResponse = await userService.register({ name, email, password });
      sendSuccess(res, 'User registered successfully', authResponse);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        sendError(res, 'Email and password are required', 400);
        return;
      }

      const authResponse = await userService.login(email, password);
      sendSuccess(res, 'Login successful', authResponse);
    } catch (error: any) {
      sendError(res, error.message, 401);
    }
  }
}