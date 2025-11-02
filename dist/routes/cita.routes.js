"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const cita_controller_1 = require("../controllers/cita.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
// GET todas las citas
router.get('/', async (req, res, next) => {
    try {
        await (0, cita_controller_1.obtenerCitas)(req, res);
    }
    catch (err) {
        next(err);
    }
});
// POST crear cita
router.post('/', async (req, res, next) => {
    try {
        await (0, cita_controller_1.crearCita)(req, res);
    }
    catch (err) {
        next(err);
    }
});
// PUT actualizar cita
router.put('/:id', async (req, res, next) => {
    try {
        await (0, cita_controller_1.actualizarCita)(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
// DELETE eliminar cita
router.delete('/:id', async (req, res, next) => {
    try {
        await (0, cita_controller_1.eliminarCita)(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=cita.routes.js.map