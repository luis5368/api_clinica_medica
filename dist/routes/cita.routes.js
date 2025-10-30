"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cita_controller_1 = require("../controllers/cita.controller");
const router = (0, express_1.Router)();
router.get('/', cita_controller_1.obtenerCitas);
router.post('/', cita_controller_1.crearCita);
router.delete('/:id', cita_controller_1.eliminarCita);
exports.default = router;
//# sourceMappingURL=cita.routes.js.map