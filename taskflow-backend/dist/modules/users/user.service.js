"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
const jwt_1 = require("../../utils/jwt");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async register(userData) {
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Create user
        const user = await this.userRepository.create(userData);
        // Generate token
        const token = (0, jwt_1.generateToken)({
            userId: user._id.toString(),
            email: user.email
        });
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        };
    }
    async login(email, password) {
        // Find user by email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        // Generate token
        const token = (0, jwt_1.generateToken)({
            userId: user._id.toString(),
            email: user.email
        });
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        };
    }
}
exports.UserService = UserService;
