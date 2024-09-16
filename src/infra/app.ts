import express from 'express'
import serviceRoutes from './routes/service.routes'
import mongoose from 'mongoose'
import 'dotenv/config'
import { env } from './env/env'

const app = express()

app.use(express.json())

console.log(process.env)

app.use('/api', serviceRoutes)

const mongoUri = env.DATABASE_URL

mongoose
  .connect(mongoUri, {})
  .then(() => console.log('Conectado ao mongo DB'))
  .catch((error) => console.error('Erro ao conectar ao mongoDB', error))

export default app
