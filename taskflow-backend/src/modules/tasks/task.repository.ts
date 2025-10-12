import { TaskModel, ITask } from './task.model';

export class TaskRepository {
  async create(data: Partial<ITask>): Promise<ITask> {
    const task = new TaskModel(data);
    return await task.save();
  }

  async findByUser(userId: string): Promise<ITask[]> {
    return await TaskModel.find({ userId }).sort({ createdAt: -1 });
    
  }

  async findById(id: string): Promise<ITask | null> {
    return await TaskModel.findById(id);
  }

  async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return await TaskModel.findByIdAndUpdate(
      id, 
      data, 
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<void> {
    await TaskModel.findByIdAndDelete(id);
  }
}