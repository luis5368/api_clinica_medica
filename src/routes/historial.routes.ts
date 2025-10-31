import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
  getHistoriales,
  getHistorialById,
  createHistorial
} from '../controllers/historial.controller';

const router = Router();
router.use(authMiddleware);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getHistoriales(req, res).catch(next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  getHistorialById(req, res).catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createHistorial(req, res).catch(next);
});

export default router;
