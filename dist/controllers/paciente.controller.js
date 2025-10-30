"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaciente = exports.updatePaciente = exports.createPaciente = exports.getPacienteById = exports.getPacientes = void 0;
const db_1 = require("../db");
const getPacientes = async (_req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request().query('SELECT * FROM PACIENTE');
        res.json(result.recordset);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo pacientes' });
    }
};
exports.getPacientes = getPacientes;
const getPacienteById = async (req, res) => {
    try {
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('id', req.params.id)
            .query('SELECT * FROM PACIENTE WHERE ID_PACIENTE = @id');
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'Paciente no encontrado' });
            return;
        }
        res.json(result.recordset[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error obteniendo paciente' });
    }
};
exports.getPacienteById = getPacienteById;
const createPaciente = async (req, res) => {
    const { DPI, NOMBRES, APELLIDOS, FECHA_NAC, SEXO, DIRECCION, TELEFONO, EMAIL, ID_SUCURSAL } = req.body;
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('DPI', DPI)
            .input('NOMBRES', NOMBRES)
            .input('APELLIDOS', APELLIDOS)
            .input('FECHA_NAC', FECHA_NAC)
            .input('SEXO', SEXO)
            .input('DIRECCION', DIRECCION)
            .input('TELEFONO', TELEFONO)
            .input('EMAIL', EMAIL)
            .input('ID_SUCURSAL', ID_SUCURSAL)
            .query(`INSERT INTO PACIENTE (DPI, NOMBRES, APELLIDOS, FECHA_NAC, SEXO, DIRECCION, TELEFONO, EMAIL, ID_SUCURSAL)
              VALUES (@DPI, @NOMBRES, @APELLIDOS, @FECHA_NAC, @SEXO, @DIRECCION, @TELEFONO, @EMAIL, @ID_SUCURSAL)`);
        res.status(201).json({ message: 'Paciente creado' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creando paciente' });
    }
};
exports.createPaciente = createPaciente;
const updatePaciente = async (req, res) => {
    const { DPI, NOMBRES, APELLIDOS, FECHA_NAC, SEXO, DIRECCION, TELEFONO, EMAIL, ID_SUCURSAL } = req.body;
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('id', req.params.id)
            .input('DPI', DPI)
            .input('NOMBRES', NOMBRES)
            .input('APELLIDOS', APELLIDOS)
            .input('FECHA_NAC', FECHA_NAC)
            .input('SEXO', SEXO)
            .input('DIRECCION', DIRECCION)
            .input('TELEFONO', TELEFONO)
            .input('EMAIL', EMAIL)
            .input('ID_SUCURSAL', ID_SUCURSAL)
            .query(`UPDATE PACIENTE SET
                DPI=@DPI, NOMBRES=@NOMBRES, APELLIDOS=@APELLIDOS,
                FECHA_NAC=@FECHA_NAC, SEXO=@SEXO, DIRECCION=@DIRECCION,
                TELEFONO=@TELEFONO, EMAIL=@EMAIL, ID_SUCURSAL=@ID_SUCURSAL
              WHERE ID_PACIENTE=@id`);
        res.json({ message: 'Paciente actualizado' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error actualizando paciente' });
    }
};
exports.updatePaciente = updatePaciente;
const deletePaciente = async (req, res) => {
    try {
        const pool = await db_1.poolPromise;
        await pool.request()
            .input('id', req.params.id)
            .query('DELETE FROM PACIENTE WHERE ID_PACIENTE=@id');
        res.json({ message: 'Paciente eliminado' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error eliminando paciente' });
    }
};
exports.deletePaciente = deletePaciente;
//# sourceMappingURL=paciente.controller.js.map