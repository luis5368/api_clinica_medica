"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const historial_controller_1 = require("../controllers/historial.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
// GET todos
router.get('/', (req, res, next) => {
    (0, historial_controller_1.getHistoriales)(req, res).catch(next);
});
// GET por ID
router.get('/:id', (req, res, next) => {
    (0, historial_controller_1.getHistorialById)(req, res).catch(next);
});
// POST (opcional si decides permitir creación manual)
router.post('/', (req, res, next) => {
    (0, historial_controller_1.createHistorial)(req, res).catch(next);
});
// DELETE historial
router.delete('/:id', (req, res, next) => {
    (0, historial_controller_1.deleteHistorial)(req, res).catch(next);
});
exports.default = router;
//# sourceMappingURL=historial.routes.js.map