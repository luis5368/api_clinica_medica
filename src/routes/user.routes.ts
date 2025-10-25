// src/routes/user.routes.ts
import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';
import { authMiddleware, requireRoles } from '../middlewares/auth';

const router = Router();

// Solo superadmin y admin pueden ver usuarios y crear nuevos
router.get('/', authMiddleware, requireRoles(['superadmin', 'admin']), getUsers);
router.post('/', authMiddleware, requireRoles(['superadmin', 'admin']), createUser);

export default router;
