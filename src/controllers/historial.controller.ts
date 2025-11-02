// src/controllers/historial.controller.ts
import { Request, Response } from 'express';
import { poolPromise } from '../db';

export const getHistoriales = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM HISTORIAL_MEDICO');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo historial médico' });
  }
};

export const getHistorialById = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', req.params.id)
      .query('SELECT * FROM HISTORIAL_MEDICO WHERE ID_HISTORIAL=@id');

    if (result.recordset.length === 0)
      return res.status(404).json({ message: 'Historial no encontrado' });

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo historial médico' });
  }
};

export const createHistorial = async (req: Request, res: Response) => {
  const { ID_PACIENTE, ID_ATENCION, OBSERVACIONES, FECHA_REGISTRO } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('ID_PACIENTE', ID_PACIENTE)
      .input('ID_ATENCION', ID_ATENCION)
      .input('OBSERVACIONES', OBSERVACIONES)
      .input('FECHA_REGISTRO', FECHA_REGISTRO)
      .query(`INSERT INTO HISTORIAL_MEDICO (ID_PACIENTE, ID_ATENCION, OBSERVACIONES, FECHA_REGISTRO)
              VALUES (@ID_PACIENTE, @ID_ATENCION, @OBSERVACIONES, @FECHA_REGISTRO)`);

    res.status(201).json({ message: 'Historial médico creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando historial médico' });
  }
};

// DELETE historial
export const deleteHistorial = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', req.params.id)
      .query('DELETE FROM HISTORIAL_MEDICO WHERE ID_HISTORIAL = @id');

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ message: 'Historial no encontrado' });

    res.status(200).json({ message: 'Historial eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando historial' });
  }
};
