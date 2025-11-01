// src/controllers/empleado.controller.ts
import { Request, Response } from 'express';
import { poolPromise } from '../db';

// Obtener todos los empleados
export const getEmpleados = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM PERSONAL');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo empleados' });
  }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT * FROM PERSONAL WHERE ID_PERSONAL=@id');

    if (result.recordset.length === 0)
      return res.status(404).json({ message: 'Empleado no encontrado' });

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo empleado' });
  }
};

// Crear un empleado
export const createEmpleado = async (req: Request, res: Response) => {
  const { NOMBRES, APELLIDOS, CARGO, ESPECIALIDAD, TELEFONO, EMAIL, ID_SUCURSAL } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('NOMBRES', NOMBRES)
      .input('APELLIDOS', APELLIDOS)
      .input('CARGO', CARGO)
      .input('ESPECIALIDAD', ESPECIALIDAD)
      .input('TELEFONO', TELEFONO)
      .input('EMAIL', EMAIL)
      .input('ID_SUCURSAL', ID_SUCURSAL)
      .query(`INSERT INTO PERSONAL (NOMBRES, APELLIDOS, CARGO, ESPECIALIDAD, TELEFONO, EMAIL, ID_SUCURSAL)
              VALUES (@NOMBRES, @APELLIDOS, @CARGO, @ESPECIALIDAD, @TELEFONO, @EMAIL, @ID_SUCURSAL)`);

    res.status(201).json({ message: 'Empleado creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando empleado' });
  }
};

// Actualizar empleado
export const updateEmpleado = async (req: Request, res: Response) => {
  const { NOMBRES, APELLIDOS, CARGO, ESPECIALIDAD, TELEFONO, EMAIL, ID_SUCURSAL } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', req.params.id)
      .input('NOMBRES', NOMBRES)
      .input('APELLIDOS', APELLIDOS)
      .input('CARGO', CARGO)
      .input('ESPECIALIDAD', ESPECIALIDAD)
      .input('TELEFONO', TELEFONO)
      .input('EMAIL', EMAIL)
      .input('ID_SUCURSAL', ID_SUCURSAL)
      .query(`UPDATE PERSONAL SET
                NOMBRES=@NOMBRES,
                APELLIDOS=@APELLIDOS,
                CARGO=@CARGO,
                ESPECIALIDAD=@ESPECIALIDAD,
                TELEFONO=@TELEFONO,
                EMAIL=@EMAIL,
                ID_SUCURSAL=@ID_SUCURSAL
              WHERE ID_PERSONAL=@id`);

    res.json({ message: 'Empleado actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando empleado' });
  }
};

// Eliminar empleado
export const deleteEmpleado = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM PERSONAL WHERE ID_PERSONAL=@id');

    res.json({ message: 'Empleado eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando empleado' });
  }
};
