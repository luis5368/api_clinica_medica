import { Request, Response, NextFunction } from 'express';
import { poolPromise } from '../db';

// Obtener todas las citas
export const obtenerCitas = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM CITAS ORDER BY FECHA, HORA');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo citas' });
  }
};

// Crear una cita
export const crearCita = async (req: Request, res: Response) => {
  try {
    const { paciente, fecha, hora, motivo } = req.body;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('PACIENTE', paciente)
      .input('FECHA', fecha)
      .input('HORA', hora || null)
      .input('MOTIVO', motivo || null)
      .query(`
        INSERT INTO CITAS (PACIENTE, FECHA, HORA, MOTIVO)
        OUTPUT INSERTED.*
        VALUES (@PACIENTE, @FECHA, @HORA, @MOTIVO)
      `);

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando cita' });
  }
};

// Actualizar una cita
export const actualizarCita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { paciente, fecha, hora, motivo } = req.body;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('ID', id)
      .input('PACIENTE', paciente)
      .input('FECHA', fecha)
      .input('HORA', hora || null)
      .input('MOTIVO', motivo || null)
      .query(`
        UPDATE CITAS
        SET PACIENTE=@PACIENTE, FECHA=@FECHA, HORA=@HORA, MOTIVO=@MOTIVO
        OUTPUT INSERTED.*
        WHERE ID=@ID
      `);

    if (result.recordset.length === 0) return res.status(404).json({ message: 'Cita no encontrada' });

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
};

// Eliminar una cita
export const eliminarCita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const pool = await poolPromise;

    const result = await pool.request()
      .input('ID', id)
      .query('DELETE FROM CITAS WHERE ID=@ID');

    if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Cita no encontrada' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
