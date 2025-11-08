"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../modules/users/user.controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.UserController.register);
router.post('/login', user_controller_1.UserController.login);
exports.default = router;
