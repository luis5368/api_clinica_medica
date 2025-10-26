import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { getPacientes, getPacienteById, createPaciente, updatePaciente, deletePaciente } from '../controllers/paciente.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getPacientes);
router.get('/:id', getPacienteById);
router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

export default router;
