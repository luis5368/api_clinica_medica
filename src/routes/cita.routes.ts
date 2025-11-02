import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { obtenerCitas, crearCita, actualizarCita, eliminarCita } from '../controllers/cita.controller';

const router = Router();
router.use(authMiddleware);

// GET todas las citas
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await obtenerCitas(req, res);
  } catch (err) {
    next(err);
  }
});

// POST crear cita
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await crearCita(req, res);
  } catch (err) {
    next(err);
  }
});

// PUT actualizar cita
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await actualizarCita(req, res, next);
  } catch (err) {
    next(err);
  }
});

// DELETE eliminar cita
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await eliminarCita(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;
