import { DataTypes } from 'sequelize';
import conexao from '../database.js';
import EPI from './Epi.js'; 
import Funcionario from './Funcionario.js'; 

const Devolucao = conexao.define('Devolucao', {
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
  tableName: 'devolucoes',
  timestamps: false
});

Devolucao.belongsTo(EPI, { foreignKey: 'epiId' });
Devolucao.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });

EPI.hasMany(Devolucao, { foreignKey: 'epiId' });
Funcionario.hasMany(Devolucao, { foreignKey: 'funcionarioId' });

export default Devolucao;
