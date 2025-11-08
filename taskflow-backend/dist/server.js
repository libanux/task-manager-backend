"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('🟢 SERVER: Starting server.ts...');
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
console.log('🟢 SERVER: Imports loaded');
const PORT = process.env.PORT || 3000;
console.log('🟢 SERVER: Port set to:', PORT);
// Start server
const startServer = async () => {
    try {
        console.log('🟢 SERVER: Starting server...');
        await (0, db_1.connectDB)();
        console.log('🟢 SERVER: Database connected');
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); /*process.exit(1) means "Stop the server immediately
        with an error" ⚡ */
    }
};
startServer();
