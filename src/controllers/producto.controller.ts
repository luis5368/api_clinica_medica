// src/controllers/producto.controller.ts
import { Request, Response } from 'express';
import { poolPromise } from '../db';

// Obtener todos los productos
export const getProductos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM PRODUCTO');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo productos' });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT * FROM PRODUCTO WHERE ID_PRODUCTO=@id');

    if (result.recordset.length === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo producto' });
  }
};

// Crear un nuevo producto
export const createProducto = async (req: Request, res: Response): Promise<void> => {
  const { NOMBRE, DESCRIPCION, TIPO, PRECIO_COSTO, PRECIO_VENTA, STOCK, ID_SUCURSAL } = req.body;

  try {
    const pool = await poolPromise;
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando producto' });
  }
};

// Actualizar un producto existente
export const updateProducto = async (req: Request, res: Response): Promise<void> => {
  const { NOMBRE, DESCRIPCION, TIPO, PRECIO_COSTO, PRECIO_VENTA, STOCK, ID_SUCURSAL } = req.body;

  try {
    const pool = await poolPromise;
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando producto' });
  }
};

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM PRODUCTO WHERE ID_PRODUCTO=@id');

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando producto' });
  }
};
