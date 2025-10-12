import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { sendSuccess, sendError } from '../../utils/response';

const taskService = new TaskService();

export class TaskController {
  static async createTask(req: Request, res: Response): Promise<void> {

    /*for example req here will be like this---> 
    req = {
  headers: {
    authorization: "Bearer eyJxyz..."
  },
  body: { title: "Learn Angular" },
  user: {  // ← ADDED BY MIDDLEWARE!                        
    userId: "123",
    email: "john@test.com"
  }
} */
    try {
      const userId = req.user!.userId;
      const { title, description } = req.body;

      if (!title) {
        sendError(res, 'Task title is required', 400);
        return;
      }

      const task = await taskService.createTask(userId, { title, description });
      sendSuccess(res, 'Task created successfully', task);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  static async getUserTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const tasks = await taskService.getUserTasks(userId);
      sendSuccess(res, 'Tasks retrieved successfully', tasks);
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const taskId = req.params.id;
      const updateData = req.body;

      const task = await taskService.updateTask(taskId, userId, updateData);
      if (!task) {
        sendError(res, 'Task not found', 404);
        return;
      }

      sendSuccess(res, 'Task updated successfully', task);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const taskId = req.params.id;

      await taskService.deleteTask(taskId, userId);
      sendSuccess(res, 'Task deleted successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}