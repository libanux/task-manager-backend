import { TaskRepository } from './task.repository';
import { ITask } from './task.model';

export class TaskService {
  private taskRepository = new TaskRepository();

  async createTask(userId: string, data: Partial<ITask>): Promise<ITask> {
    return await this.taskRepository.create({ ...data, userId });
  }

  async getUserTasks(userId: string): Promise<ITask[]> {
    return await this.taskRepository.findByUser(userId);
  }

  async updateTask(taskId: string, userId: string, data: Partial<ITask>): Promise<ITask | null> {
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

  async deleteTask(taskId: string, userId: string): Promise<void> {
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