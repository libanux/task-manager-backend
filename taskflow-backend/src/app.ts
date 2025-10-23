console.log('🟢 APP: Starting app.ts...');

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


console.log('🟢 APP: Core imports loaded');

// Load environment variables
dotenv.config();
console.log('🟢 APP: Environment variables loaded');


// Import routes
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

console.log('🔍 Debug: User routes imported:', userRoutes);
console.log('🔍 Debug: Task routes imported:', taskRoutes);

const app = express();

// Middleware
app.use(cors({
  origin:true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
}));
/*What it does: Allows your frontend to talk to backend */
app.use(express.json());/*What it does: Automatically converts JSON requests to
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
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

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
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});  /*This is a Global Error Handler - it's like a safety net 
that catches ALL errors in your app! 🛡️ */

export default app;