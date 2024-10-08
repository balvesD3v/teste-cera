import express from 'express'
import serviceRoutes from './routes/service.routes'
import mongoose from 'mongoose'
import { env } from './env/env'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './docs/swagger'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api', serviceRoutes)

const mongoUri = env.DATABASE_URL

mongoose
  .connect(mongoUri, {})
  .then(() => console.log('Conectado ao mongo DB'))
  .catch((error) => console.error('Erro ao conectar ao mongoDB', error))

export default app
