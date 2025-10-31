"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const habitacion_controller_1 = require("../controllers/habitacion.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', (req, res, next) => {
    (0, habitacion_controller_1.getHabitaciones)(req, res).catch(next);
});
router.get('/:id', (req, res, next) => {
    (0, habitacion_controller_1.getHabitacionById)(req, res).catch(next);
});
router.post('/', (req, res, next) => {
    (0, habitacion_controller_1.createHabitacion)(req, res).catch(next);
});
router.put('/:id', (req, res, next) => {
    (0, habitacion_controller_1.updateHabitacion)(req, res).catch(next);
});
router.delete('/:id', (req, res, next) => {
    (0, habitacion_controller_1.deleteHabitacion)(req, res).catch(next);
});
exports.default = router;
//# sourceMappingURL=habitacion.routes.js.map