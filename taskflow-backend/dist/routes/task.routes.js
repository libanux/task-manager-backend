"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../modules/tasks/task.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// All task routes require authentication
router.use(auth_middleware_1.authMiddleware); /*means: "Run the authMiddleware on EVERY route
 in this router" 🔒*/
router.post('/', task_controller_1.TaskController.createTask);
router.get('/', task_controller_1.TaskController.getUserTasks);
router.put('/:id', task_controller_1.TaskController.updateTask);
router.delete('/:id', task_controller_1.TaskController.deleteTask);
exports.default = router;
