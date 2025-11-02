import { Request, Response, NextFunction } from 'express';
import { poolPromise } from '../db';

// Obtener todas las citas con paciente y empleado
export const obtenerCitas = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        c.ID,
        c.FECHA,
        c.HORA,
        c.MOTIVO,
        c.ID_PACIENTE,
        c.ID_EMPLEADO,
        p.NOMBRES + ' ' + p.APELLIDOS AS PACIENTE,
        e.NOMBRES + ' ' + e.APELLIDOS AS EMPLEADO
      FROM CITAS c
      LEFT JOIN PACIENTE p ON c.ID_PACIENTE = p.ID_PACIENTE
      LEFT JOIN PERSONAL e ON c.ID_EMPLEADO = e.ID_PERSONAL
      ORDER BY c.FECHA, c.HORA
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo citas' });
  }
};


// Crear cita
export const crearCita = async (req: Request, res: Response) => {
  try {
    const { id_paciente, id_empleado, fecha, hora, motivo } = req.body;
    const pool = await poolPromise;

    // Insertar y devolver la cita recién creada
    const result = await pool.request()
      .input('ID_PACIENTE', id_paciente)
      .input('ID_EMPLEADO', id_empleado || null)
      .input('FECHA', fecha)
      .input('HORA', hora || null)
      .input('MOTIVO', motivo || null)
      .query(`
        INSERT INTO CITAS (ID_PACIENTE, ID_EMPLEADO, FECHA, HORA, MOTIVO)
        OUTPUT INSERTED.*
        VALUES (@ID_PACIENTE, @ID_EMPLEADO, @FECHA, @HORA, @MOTIVO)
      `);

    const citaId = result.recordset[0].ID;

    // Traer la cita completa con nombres
    const citaCompleta = await pool.request()
      .input('ID', citaId)
      .query(`
        SELECT 
          c.ID,
          c.FECHA,
          c.HORA,
          c.MOTIVO,
          CONCAT(p.NOMBRES, ' ', p.APELLIDOS) AS PACIENTE,
          CONCAT(e.NOMBRES, ' ', e.APELLIDOS) AS EMPLEADO
        FROM CITAS c
        JOIN PACIENTE p ON c.ID_PACIENTE = p.ID_PACIENTE
        LEFT JOIN PERSONAL e ON c.ID_EMPLEADO = e.ID_PERSONAL
        WHERE c.ID = @ID
      `);

    res.status(201).json(citaCompleta.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando cita' });
  }
};

// Actualizar cita
export const actualizarCita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { id_paciente, id_empleado, fecha, hora, motivo } = req.body;
    const pool = await poolPromise;

    // Actualizar la cita
    const result = await pool.request()
      .input('ID', id)
      .input('ID_PACIENTE', id_paciente)
      .input('ID_EMPLEADO', id_empleado || null)
      .input('FECHA', fecha)
      .input('HORA', hora || null)
      .input('MOTIVO', motivo || null)
      .query(`
        UPDATE CITAS
        SET ID_PACIENTE=@ID_PACIENTE, ID_EMPLEADO=@ID_EMPLEADO, FECHA=@FECHA, HORA=@HORA, MOTIVO=@MOTIVO
        OUTPUT INSERTED.*
        WHERE ID=@ID
      `);

    if (result.recordset.length === 0)
      return res.status(404).json({ message: 'Cita no encontrada' });

    // Traer la cita completa con nombres
    const citaCompleta = await pool.request()
      .input('ID', id)
      .query(`
        SELECT 
          c.ID,
          c.FECHA,
          c.HORA,
          c.MOTIVO,
          CONCAT(p.NOMBRES, ' ', p.APELLIDOS) AS PACIENTE,
          CONCAT(e.NOMBRES, ' ', e.APELLIDOS) AS EMPLEADO
        FROM CITAS c
        JOIN PACIENTE p ON c.ID_PACIENTE = p.ID_PACIENTE
        LEFT JOIN PERSONAL e ON c.ID_EMPLEADO = e.ID_PERSONAL
        WHERE c.ID = @ID
      `);

    res.json(citaCompleta.recordset[0]);
  } catch (err) {
    next(err);
  }
};

// Eliminar cita
export const eliminarCita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const pool = await poolPromise;

    const result = await pool.request()
      .input('ID', id)
      .query('DELETE FROM CITAS WHERE ID=@ID');

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ message: 'Cita no encontrada' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
