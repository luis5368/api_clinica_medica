"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCita = exports.actualizarCita = exports.crearCita = exports.obtenerCitas = void 0;
const db_1 = require("../db");
// Obtener todas las citas con paciente y empleado
const obtenerCitas = async (_req, res) => {
    try {
        const pool = await db_1.poolPromise;
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo citas' });
    }
};
exports.obtenerCitas = obtenerCitas;
// Crear cita
const crearCita = async (req, res) => {
    try {
        const { id_paciente, id_empleado, fecha, hora, motivo } = req.body;
        const pool = await db_1.poolPromise;
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creando cita' });
    }
};
exports.crearCita = crearCita;
// Actualizar cita
const actualizarCita = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { id_paciente, id_empleado, fecha, hora, motivo } = req.body;
        const pool = await db_1.poolPromise;
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
    }
    catch (err) {
        next(err);
    }
};
exports.actualizarCita = actualizarCita;
// Eliminar cita
const eliminarCita = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('ID', id)
            .query('DELETE FROM CITAS WHERE ID=@ID');
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ message: 'Cita no encontrada' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.eliminarCita = eliminarCita;
//# sourceMappingURL=cita.controller.js.map