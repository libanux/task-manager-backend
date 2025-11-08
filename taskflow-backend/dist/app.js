"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('🟢 APP: Starting app.ts...');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
console.log('🟢 APP: Core imports loaded');
// Load environment variables
dotenv_1.default.config();
console.log('🟢 APP: Environment variables loaded');
// Import routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
console.log('🔍 Debug: User routes imported:', user_routes_1.default);
console.log('🔍 Debug: Task routes imported:', task_routes_1.default);
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
}));
/*What it does: Allows your frontend to talk to backend */
app.use(express_1.default.json()); /*What it does: Automatically converts JSON requests to
 JavaScript objects

Without it:
// Request: {"name": "John", "age": 30}
console.log(req.body); // ❌ undefined or raw string
With it:
// Request: {"name": "John", "age": 30}
console.log(req.body); // ✅ {name: "John", age: 30} (JavaScript object) */
// Root route - ADDED THIS
app.get('/', (req, res) => {
    res.json({
        message: '🚀 TaskFlow Backend API is running!',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            users: '/api/users',
            tasks: '/api/tasks'
        },
        documentation: 'Visit /api/health for server status'
    });
});
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/tasks', task_routes_1.default);
console.log('🔍 Debug: Routes mounted successfully');
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'TaskFlow API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// TEMPORARY TEST ROUTE - NO AUTH REQUIRED
app.get('/api/tasks-test', (req, res) => {
    console.log('🟢 TEST: Tasks test route called');
    res.json({
        message: 'Test route works!',
        tasks: [
            { id: 1, title: 'Test Task 1' },
            { id: 2, title: 'Test Task 2' }
        ]
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl,
        availableEndpoints: {
            root: '/',
            health: '/api/health',
            users: '/api/users/*',
            tasks: '/api/tasks/*'
        }
    });
});
// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
}); /*This is a Global Error Handler - it's like a safety net
that catches ALL errors in your app! 🛡️ */
exports.default = app;
