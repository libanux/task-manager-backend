import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async (): Promise<void> => {
  try {
    console.log('🟢 SERVER: Starting server...');
    
    await connectDB();
    console.log('🟢 SERVER: Database connected');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);/*process.exit(1) means "Stop the server immediately 
    with an error" ⚡ */
  }
};

startServer();