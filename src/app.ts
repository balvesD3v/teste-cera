import express from 'express'
import serviceRoutes from './infra/routes/service.routes'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

app.use('/api', serviceRoutes)

const mongoUri =
  'mongodb+srv://luiz:lp15102002@cluster0.qkm6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
  .connect(mongoUri, {})
  .then(() => console.log('Conectado ao mongo DB'))
  .catch((error) => console.error('Erro ao conectar ao mongoDB', error))

export default app
