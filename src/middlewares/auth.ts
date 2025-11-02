// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { poolPromise } from '../db';
import sql from 'mssql';
import { Role } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface UserPayload {
  id: number;
  role: Role;
  permissions?: string[];
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

// Middleware para autenticar token y verificar sesión única
export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

  const [, token] = authHeader.split(' ');
  if (!token) return res.status(401).json({ error: 'Token faltante' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('userId', sql.Int, payload.id)
      .query('SELECT * FROM users WHERE id = @userId');

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    // Validar token único
    if (user.activeToken !== token) {
      return res.status(401).json({ error: 'Sesión inválida. Se ha iniciado sesión en otro dispositivo.' });
    }

    req.user = { id: user.id, role: user.role, permissions: user.permissions };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// Middleware para roles estáticos
export function requireRoles(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Permiso denegado' });
      return;
    }
    next();
  };
}

// Middleware para permisos dinámicos desde DB
export function requirePermission(permission: string) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.permissions?.includes(permission)) {
      res.status(403).json({ error: 'Permiso denegado' });
      return;
    }
    next();
  };
}
