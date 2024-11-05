import { DataTypes } from 'sequelize';
import conexao from '../database.js';
import EPI from './Epi.js';
import Funcionario from './Funcionario.js';
import Registro from './Registro.js';
import Devolucao from './Devolucao.js';

const Historico = conexao.define('Historico', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  funcionarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  epiId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  registroId: {
    type: DataTypes.INTEGER, 
    allowNull: true,
  },
  devolucaoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'historicos',
  timestamps: false
});

Historico.belongsTo(EPI, { foreignKey: 'epiId' });
Historico.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });

EPI.hasMany(Historico, { foreignKey: 'epiId' });
Funcionario.hasMany(Historico, { foreignKey: 'funcionarioId' });

export default Historico;
