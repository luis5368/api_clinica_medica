"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Solo superadmin y admin pueden ver usuarios y crear nuevos
router.get('/', auth_1.authMiddleware, (0, auth_1.requireRoles)(['superadmin', 'admin']), user_controller_1.getUsers);
router.post('/', auth_1.authMiddleware, (0, auth_1.requireRoles)(['superadmin', 'admin']), user_controller_1.createUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map