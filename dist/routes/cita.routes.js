"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const cita_controller_1 = require("../controllers/cita.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', async (req, res) => {
    await (0, cita_controller_1.obtenerCitas)(req, res);
});
router.post('/', async (req, res) => {
    await (0, cita_controller_1.crearCita)(req, res);
});
router.put('/:id', async (req, res) => {
    await (0, cita_controller_1.actualizarCita)(req, res);
});
router.delete('/:id', async (req, res) => {
    await (0, cita_controller_1.eliminarCita)(req, res);
});
exports.default = router;
//# sourceMappingURL=cita.routes.js.map