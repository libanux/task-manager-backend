"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("./task.service");
const response_1 = require("../../utils/response");
const taskService = new task_service_1.TaskService();
class TaskController {
    static async createTask(req, res) {
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
            const userId = req.user.userId;
            const { title, description } = req.body;
            if (!title) {
                (0, response_1.sendError)(res, 'Task title is required', 400);
                return;
            }
            const task = await taskService.createTask(userId, { title, description });
            (0, response_1.sendSuccess)(res, 'Task created successfully', task);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 400);
        }
    }
    static async getUserTasks(req, res) {
        try {
            const userId = req.user.userId;
            const tasks = await taskService.getUserTasks(userId);
            (0, response_1.sendSuccess)(res, 'Tasks retrieved successfully', tasks);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    static async updateTask(req, res) {
        try {
            const userId = req.user.userId;
            const taskId = req.params.id;
            const updateData = req.body;
            const task = await taskService.updateTask(taskId, userId, updateData);
            if (!task) {
                (0, response_1.sendError)(res, 'Task not found', 404);
                return;
            }
            (0, response_1.sendSuccess)(res, 'Task updated successfully', task);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 400);
        }
    }
    static async deleteTask(req, res) {
        try {
            const userId = req.user.userId;
            const taskId = req.params.id;
            await taskService.deleteTask(taskId, userId);
            (0, response_1.sendSuccess)(res, 'Task deleted successfully');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 400);
        }
    }
}
exports.TaskController = TaskController;
