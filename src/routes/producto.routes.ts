import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } from '../controllers/producto.controller';

const router = Router();
router.use(authMiddleware);

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;
