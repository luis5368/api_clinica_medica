"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistorial = exports.getHistorialById = exports.getHistoriales = void 0;
const db_1 = require("../db");
const getHistoriales = async (_req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request().query('SELECT * FROM HISTORIAL_MEDICO');
        res.json(result.recordset);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo historial médico' });
    }
};
exports.getHistoriales = getHistoriales;
const getHistorialById = async (req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('id', req.params.id)
            .query('SELECT * FROM HISTORIAL_MEDICO WHERE ID_HISTORIAL=@id');
        if (result.recordset.length === 0)
            return res.status(404).json({ message: 'Historial no encontrado' });
        res.json(result.recordset[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo historial médico' });
    }
};
exports.getHistorialById = getHistorialById;
const createHistorial = async (req, res) => {
    const { ID_PACIENTE, ID_ATENCION, OBSERVACIONES, FECHA_REGISTRO } = req.body;
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('ID_PACIENTE', ID_PACIENTE)
            .input('ID_ATENCION', ID_ATENCION)
            .input('OBSERVACIONES', OBSERVACIONES)
            .input('FECHA_REGISTRO', FECHA_REGISTRO)
            .query(`INSERT INTO HISTORIAL_MEDICO (ID_PACIENTE, ID_ATENCION, OBSERVACIONES, FECHA_REGISTRO)
              VALUES (@ID_PACIENTE, @ID_ATENCION, @OBSERVACIONES, @FECHA_REGISTRO)`);
        res.status(201).json({ message: 'Historial médico creado' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creando historial médico' });
    }
};
exports.createHistorial = createHistorial;
//# sourceMappingURL=historial.controller.js.map