import { DataTypes } from 'sequelize';
import conexao from '../database.js';

const EPI = conexao.define('EPI', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'epis',
  timestamps: false
});

export default EPI;
