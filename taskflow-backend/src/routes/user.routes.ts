import { Router } from 'express';
import { UserController } from '../modules/users/user.controller';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;