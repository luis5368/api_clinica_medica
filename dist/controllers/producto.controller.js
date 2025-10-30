"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getProductos = void 0;
const db_1 = require("../db");
// Obtener todos los productos
const getProductos = async (_req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request().query('SELECT * FROM PRODUCTO');
        res.json(result.recordset);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo productos' });
    }
};
exports.getProductos = getProductos;
// Obtener un producto por ID
const getProductoById = async (req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('id', req.params.id)
            .query('SELECT * FROM PRODUCTO WHERE ID_PRODUCTO=@id');
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        res.json(result.recordset[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo producto' });
    }
};
exports.getProductoById = getProductoById;
// Crear un nuevo producto
const createProducto = async (req, res) => {
    const { NOMBRE, DESCRIPCION, TIPO, PRECIO_COSTO, PRECIO_VENTA, STOCK, ID_SUCURSAL } = req.body;
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('NOMBRE', NOMBRE)
            .input('DESCRIPCION', DESCRIPCION)
            .input('TIPO', TIPO)
            .input('PRECIO_COSTO', PRECIO_COSTO)
            .input('PRECIO_VENTA', PRECIO_VENTA)
            .input('STOCK', STOCK)
            .input('ID_SUCURSAL', ID_SUCURSAL)
            .query(`INSERT INTO PRODUCTO (NOMBRE, DESCRIPCION, TIPO, PRECIO_COSTO, PRECIO_VENTA, STOCK, ID_SUCURSAL)
              VALUES (@NOMBRE, @DESCRIPCION, @TIPO, @PRECIO_COSTO, @PRECIO_VENTA, @STOCK, @ID_SUCURSAL)`);
        res.status(201).json({ message: 'Producto creado correctamente' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creando producto' });
    }
};
exports.createProducto = createProducto;
// Actualizar un producto existente
const updateProducto = async (req, res) => {
    const { NOMBRE, DESCRIPCION, TIPO, PRECIO_COSTO, PRECIO_VENTA, STOCK, ID_SUCURSAL } = req.body;
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('id', req.params.id)
            .input('NOMBRE', NOMBRE)
            .input('DESCRIPCION', DESCRIPCION)
            .input('TIPO', TIPO)
            .input('PRECIO_COSTO', PRECIO_COSTO)
            .input('PRECIO_VENTA', PRECIO_VENTA)
            .input('STOCK', STOCK)
            .input('ID_SUCURSAL', ID_SUCURSAL)
            .query(`UPDATE PRODUCTO SET
                NOMBRE=@NOMBRE,
                DESCRIPCION=@DESCRIPCION,
                TIPO=@TIPO,
                PRECIO_COSTO=@PRECIO_COSTO,
                PRECIO_VENTA=@PRECIO_VENTA,
                STOCK=@STOCK,
                ID_SUCURSAL=@ID_SUCURSAL
              WHERE ID_PRODUCTO=@id`);
        res.json({ message: 'Producto actualizado correctamente' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error actualizando producto' });
    }
};
exports.updateProducto = updateProducto;
// Eliminar un producto
const deleteProducto = async (req, res) => {
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('id', req.params.id)
            .query('DELETE FROM PRODUCTO WHERE ID_PRODUCTO=@id');
        res.json({ message: 'Producto eliminado correctamente' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error eliminando producto' });
    }
};
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=producto.controller.js.map