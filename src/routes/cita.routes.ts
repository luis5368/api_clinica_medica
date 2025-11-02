import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { obtenerCitas, crearCita, actualizarCita, eliminarCita } from '../controllers/cita.controller';

const router = Router();
router.use(authMiddleware);

router.get('/', (req: Request, res: Response) => obtenerCitas(req, res));
router.post('/', (req: Request, res: Response) => crearCita(req, res));

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(actualizarCita(req, res, next)).catch(next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(eliminarCita(req, res, next)).catch(next);
});

export default router;
