"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const paciente_controller_1 = require("../controllers/paciente.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', paciente_controller_1.getPacientes);
router.get('/:id', paciente_controller_1.getPacienteById);
router.post('/', paciente_controller_1.createPaciente);
router.put('/:id', paciente_controller_1.updatePaciente);
router.delete('/:id', paciente_controller_1.deletePaciente);
exports.default = router;
//# sourceMappingURL=paciente.routes.js.map