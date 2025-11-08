"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("./user.model");
class UserRepository {
    async create(userData) {
        const user = new user_model_1.UserModel(userData);
        return await user.save();
    }
    async findByEmail(email) {
        return await user_model_1.UserModel.findOne({ email });
    }
    async findById(id) {
        return await user_model_1.UserModel.findById(id);
    }
}
exports.UserRepository = UserRepository;
