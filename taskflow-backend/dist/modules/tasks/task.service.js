"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("./task.repository");
class TaskService {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
    }
    async createTask(userId, data) {
        return await this.taskRepository.create({ ...data, userId });
    }
    async getUserTasks(userId) {
        return await this.taskRepository.findByUser(userId);
    }
    async updateTask(taskId, userId, data) {
        // Verify task belongs to user
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.userId.toString() !== userId) {
            throw new Error('Access denied');
        }
        return await this.taskRepository.update(taskId, data);
    }
    async deleteTask(taskId, userId) {
        // Verify task belongs to user
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.userId.toString() !== userId) {
            throw new Error('Access denied');
        }
        await this.taskRepository.delete(taskId);
    }
}
exports.TaskService = TaskService;
