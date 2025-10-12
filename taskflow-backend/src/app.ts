import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
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

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TaskFlow API is running' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
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