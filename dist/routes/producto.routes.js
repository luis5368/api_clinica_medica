"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const producto_controller_1 = require("../controllers/producto.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', producto_controller_1.getProductos);
router.get('/:id', producto_controller_1.getProductoById);
router.post('/', producto_controller_1.createProducto);
router.put('/:id', producto_controller_1.updateProducto);
router.delete('/:id', producto_controller_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto.routes.js.map