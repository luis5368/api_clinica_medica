import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
  getHistoriales,
  getHistorialById,
  createHistorial,
  deleteHistorial
} from '../controllers/historial.controller';

const router = Router();
router.use(authMiddleware);

// GET todos
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getHistoriales(req, res).catch(next);
});

// GET por ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  getHistorialById(req, res).catch(next);
});

// POST (opcional si decides permitir creación manual)
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createHistorial(req, res).catch(next);
});

// DELETE historial
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  deleteHistorial(req, res).catch(next);
});

export default router;
