"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCita = exports.actualizarCita = exports.crearCita = exports.obtenerCitas = void 0;
const db_1 = require("../db"); // tu conexión SQL Server
const obtenerCitas = async (_req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request().query('SELECT * FROM CITAS');
        res.json(result.recordset);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error cargando citas' });
    }
};
exports.obtenerCitas = obtenerCitas;
const crearCita = async (req, res) => {
    const { PACIENTE, FECHA, HORA, MOTIVO } = req.body;
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('PACIENTE', PACIENTE)
            .input('FECHA', FECHA)
            .input('HORA', HORA)
            .input('MOTIVO', MOTIVO)
            .query(`INSERT INTO CITAS (PACIENTE, FECHA, HORA, MOTIVO)
              OUTPUT INSERTED.*
              VALUES (@PACIENTE, @FECHA, @HORA, @MOTIVO)`);
        res.status(201).json(result.recordset[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creando cita' });
    }
};
exports.crearCita = crearCita;
const actualizarCita = async (req, res) => {
    const { PACIENTE, FECHA, HORA, MOTIVO } = req.body;
    const id = parseInt(req.params.id);
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('ID_CITA', id)
            .input('PACIENTE', PACIENTE)
            .input('FECHA', FECHA)
            .input('HORA', HORA)
            .input('MOTIVO', MOTIVO)
            .query(`UPDATE CITAS 
              SET PACIENTE=@PACIENTE, FECHA=@FECHA, HORA=@HORA, MOTIVO=@MOTIVO
              OUTPUT INSERTED.*
              WHERE ID_CITA=@ID_CITA`);
        if (result.recordset.length === 0)
            return res.status(404).json({ error: 'Cita no encontrada' });
        res.json(result.recordset[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error actualizando cita' });
    }
};
exports.actualizarCita = actualizarCita;
const eliminarCita = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('ID_CITA', id)
            .query(`DELETE FROM CITAS WHERE ID_CITA=@ID_CITA`);
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ error: 'Cita no encontrada' });
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error eliminando cita' });
    }
};
exports.eliminarCita = eliminarCita;
//# sourceMappingURL=cita.controller.js.map