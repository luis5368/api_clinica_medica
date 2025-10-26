import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';
import { Sucursal } from './sucursal.model';

export class Paciente extends Model {}

Paciente.init({
  ID_PACIENTE: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DPI: { type: DataTypes.STRING, allowNull: false },
  NOMBRES: { type: DataTypes.STRING, allowNull: false },
  APELLIDOS: { type: DataTypes.STRING, allowNull: false },
  FECHA_NAC: { type: DataTypes.DATEONLY, allowNull: false },
  SEXO: { type: DataTypes.STRING, allowNull: false },
  DIRECCION: { type: DataTypes.STRING, allowNull: true },
  TELEFONO: { type: DataTypes.STRING, allowNull: true },
  EMAIL: { type: DataTypes.STRING, allowNull: true },
  ID_SUCURSAL: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize,
  modelName: 'PACIENTE',
  timestamps: false,
});

Paciente.belongsTo(Sucursal, { foreignKey: 'ID_SUCURSAL' });
