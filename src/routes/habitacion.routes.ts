import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
  getHabitaciones,
  getHabitacionById,
  createHabitacion,
  updateHabitacion,
  deleteHabitacion
} from '../controllers/habitacion.controller';

const router = Router();
router.use(authMiddleware);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getHabitaciones(req, res).catch(next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  getHabitacionById(req, res).catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createHabitacion(req, res).catch(next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  updateHabitacion(req, res).catch(next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  deleteHabitacion(req, res).catch(next);
});

export default router;
