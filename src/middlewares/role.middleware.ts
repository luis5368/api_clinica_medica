import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Se asume que authMiddleware asigna req.user
    if (!user) return res.status(401).json({ message: 'No autorizado' });
    if (!roles.includes(user.role)) return res.status(403).json({ message: 'Permiso denegado' });
    next();
  };
};
