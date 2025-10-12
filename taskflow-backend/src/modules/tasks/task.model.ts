import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  userId: { 
    type: String, 
    required: true,
    ref: 'User'
  },
  title: { 
    type: String, 
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Task title cannot be empty'],
    maxlength: [100, 'Task title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: [500, 'Task description cannot exceed 500 characters']
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for better query performance
TaskSchema.index({ userId: 1, createdAt: -1 });/*Database Index for Fast 
Task Queries 📊:

This index optimizes the most common query:

Find tasks by user + Show newest first

Makes userService.getUserTasks() much faster

Essential as your task count grows

Without it: Slow full collection scans 🐌
With it: Instant direct access 🚀 */

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);