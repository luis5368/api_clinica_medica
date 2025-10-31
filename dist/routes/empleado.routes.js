"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const empleado_controller_1 = require("../controllers/empleado.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', (req, res, next) => {
    (0, empleado_controller_1.getEmpleados)(req, res).catch(next);
});
router.get('/:id', (req, res, next) => {
    (0, empleado_controller_1.getEmpleadoById)(req, res).catch(next);
});
router.post('/', (req, res, next) => {
    (0, empleado_controller_1.createEmpleado)(req, res).catch(next);
});
router.put('/:id', (req, res, next) => {
    (0, empleado_controller_1.updateEmpleado)(req, res).catch(next);
});
router.delete('/:id', (req, res, next) => {
    (0, empleado_controller_1.deleteEmpleado)(req, res).catch(next);
});
exports.default = router;
//# sourceMappingURL=empleado.routes.js.map