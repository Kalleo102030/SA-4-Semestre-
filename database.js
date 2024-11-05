import { Sequelize } from 'sequelize'

const conexao = new Sequelize('postgresql://mumu:fSYTpxWF-ZOWiD0xDghTWw@teste1709-1697.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full')

try {
    await conexao.authenticate()
    console.log('Conectado com sucesso')
} catch (error) {
    console.error('Erro ao conectar', error)
} 

export default conexao
