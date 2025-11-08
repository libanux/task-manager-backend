"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const task_model_1 = require("./task.model");
class TaskRepository {
    async create(data) {
        const task = new task_model_1.TaskModel(data);
        return await task.save();
    }
    async findByUser(userId) {
        return await task_model_1.TaskModel.find({ userId }).sort({ createdAt: -1 });
    }
    async findById(id) {
        return await task_model_1.TaskModel.findById(id);
    }
    async update(id, data) {
        return await task_model_1.TaskModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async delete(id) {
        await task_model_1.TaskModel.findByIdAndDelete(id);
    }
}
exports.TaskRepository = TaskRepository;
