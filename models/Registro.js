import { DataTypes } from 'sequelize';
import conexao from '../database.js';
import EPI from './Epi.js'; 
import Funcionario from './Funcionario.js'; 

const Registro = conexao.define('Registro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  funcionarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Funcionario, 
      key: 'id'
    }
  },
  epiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EPI, 
      key: 'id'
    }
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'registros',
  timestamps: false
});

Registro.belongsTo(EPI, { foreignKey: 'epiId' });
Registro.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });

EPI.hasMany(Registro, { foreignKey: 'epiId' });
Funcionario.hasMany(Registro, { foreignKey: 'funcionarioId' });

export default Registro;
