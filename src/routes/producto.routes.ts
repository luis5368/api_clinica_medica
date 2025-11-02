import { Router } from 'express';
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } from '../controllers/producto.controller';

const router = Router();

// 🔓 Rutas públicas (sin autenticación)
router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;