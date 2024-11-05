
import express from 'express'
import epiRoutes from './routes/epiRoutes.js'
const app = express()
import  sequelize from './database.js'
try {
    await sequelize.sync();
} catch (err) {
    console.log(err)
}
    




app.use(express.json())
app.use(epiRoutes)

app.listen(3000, () => console.log('Servidor rodando'))