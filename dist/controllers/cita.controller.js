"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCita = exports.crearCita = exports.obtenerCitas = void 0;
const cita_model_1 = require("../models/cita.model");
const obtenerCitas = (_req, res) => {
    res.json(cita_model_1.citas);
};
exports.obtenerCitas = obtenerCitas;
const crearCita = (req, res) => {
    const nuevaCita = { id: Date.now(), ...req.body };
    cita_model_1.citas.push(nuevaCita);
    res.status(201).json(nuevaCita);
};
exports.crearCita = crearCita;
const eliminarCita = (req, res) => {
    const id = parseInt(req.params.id);
    const index = cita_model_1.citas.findIndex(c => c.id === id);
    if (index !== -1) {
        cita_model_1.citas.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).json({ error: 'Cita no encontrada' });
    }
};
exports.eliminarCita = eliminarCita;
//# sourceMappingURL=cita.controller.js.map