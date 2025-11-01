// src/controllers/habitacion.controller.ts
import { Request, Response } from 'express';
import { poolPromise } from '../db';

export const getHabitaciones = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM HABITACION');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo habitaciones' });
  }
};

export const getHabitacionById = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT * FROM HABITACION WHERE ID_HABITACION=@id');

    if (result.recordset.length === 0)
      return res.status(404).json({ message: 'Habitación no encontrada' });

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo habitación' });
  }
};

export const createHabitacion = async (req: Request, res: Response) => {
  const { NUMERO, ESTADO, ID_SUCURSAL } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('NUMERO', NUMERO)
      .input('ESTADO', ESTADO)
      .input('ID_SUCURSAL', ID_SUCURSAL)
      .query(`INSERT INTO HABITACION (NUMERO, ESTADO, ID_SUCURSAL)
              VALUES (@NUMERO, @ESTADO, @ID_SUCURSAL)`);

    res.status(201).json({ message: 'Habitación creada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando habitación' });
  }
};

export const updateHabitacion = async (req: Request, res: Response) => {
  const { NUMERO, ESTADO, ID_SUCURSAL } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', req.params.id)
      .input('NUMERO', NUMERO)
      .input('ESTADO', ESTADO)
      .input('ID_SUCURSAL', ID_SUCURSAL)
      .query(`UPDATE HABITACION SET
                NUMERO=@NUMERO,
                ESTADO=@ESTADO,
                ID_SUCURSAL=@ID_SUCURSAL
              WHERE ID_HABITACION=@id`);

    res.json({ message: 'Habitación actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando habitación' });
  }
};

export const deleteHabitacion = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM HABITACION WHERE ID_HABITACION=@id');

    res.json({ message: 'Habitación eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando habitación' });
  }
};
