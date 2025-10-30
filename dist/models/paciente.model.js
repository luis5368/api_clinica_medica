"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const sequelize_1 = require("sequelize");
//import { sequelize } from '../utils/db';
//import { Sucursal } from './sucursal.model';
class Paciente extends sequelize_1.Model {
}
exports.Paciente = Paciente;
Paciente.init({
    ID_PACIENTE: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    DPI: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    NOMBRES: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    APELLIDOS: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    FECHA_NAC: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    SEXO: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    DIRECCION: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    TELEFONO: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    EMAIL: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    ID_SUCURSAL: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: {}, // <- así TypeScript ya no se queja
    modelName: 'PACIENTE',
    timestamps: false,
});
//Paciente.belongsTo(Sucursal, { foreignKey: 'ID_SUCURSAL' });
//# sourceMappingURL=paciente.model.js.map