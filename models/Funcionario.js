import { DataTypes } from 'sequelize';
import conexao from '../database.js';

const Funcionario = conexao.define('Funcionario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'funcionarios',
  timestamps: false
});

export default Funcionario;
