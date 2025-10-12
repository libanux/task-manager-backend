import { Router } from 'express';
import { TaskController } from '../modules/tasks/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// All task routes require authentication
router.use(authMiddleware);/*means: "Run the authMiddleware on EVERY route
 in this router" 🔒*/

router.post('/', TaskController.createTask);
router.get('/', TaskController.getUserTasks);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;