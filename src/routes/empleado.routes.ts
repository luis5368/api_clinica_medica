import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
} from '../controllers/empleado.controller';

const router = Router();
router.use(authMiddleware);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getEmpleados(req, res).catch(next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  getEmpleadoById(req, res).catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createEmpleado(req, res).catch(next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  updateEmpleado(req, res).catch(next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  deleteEmpleado(req, res).catch(next);
});

export default router;
