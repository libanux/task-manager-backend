"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const response_1 = require("../../utils/response");
const userService = new user_service_1.UserService();
class UserController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            // Validation
            if (!name || !email || !password) {
                (0, response_1.sendError)(res, 'Name, email and password are required', 400);
                return;
            }
            const authResponse = await userService.register({ name, email, password });
            (0, response_1.sendSuccess)(res, 'User registered successfully', authResponse);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 400);
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            // Validation
            if (!email || !password) {
                (0, response_1.sendError)(res, 'Email and password are required', 400);
                return;
            }
            const authResponse = await userService.login(email, password);
            (0, response_1.sendSuccess)(res, 'Login successful', authResponse);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 401);
        }
    }
}
exports.UserController = UserController;
