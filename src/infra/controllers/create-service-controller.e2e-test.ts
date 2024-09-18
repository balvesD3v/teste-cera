import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import app from '../app'
import { env } from '../env/env'
import { ServiceModel } from '../models/service.model'

describe('CreateServiceController E2E', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados de teste antes de rodar os testes
    await mongoose.connect(env.DATABASE_URL)
  })

  afterAll(async () => {
    await ServiceModel.deleteMany({})

    // Desconectar do banco de dados após os testes
    await mongoose.disconnect()
  })

  it('should create a service and return 201', async () => {
    const response = await request(app).post('/api/services').send({
      description: 'Oil change',
      serviceDate: new Date().toISOString(),
      vehicleId: 'veh-123',
      clientId: 'cli-123',
      status: 'pending',
      price: 100,
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('value')
    expect(response.body.value).toHaveProperty('service')
    expect(response.body.value.service).toHaveProperty('props')
    expect(response.body.value.service.props).toHaveProperty(
      'description',
      'Oil change',
    )
  })

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/api/services').send({
      description: '',
      serviceDate: new Date(),
      vehicleId: '',
      clientId: '',
      status: 'pending',
      price: 100,
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Todos os campos são obrigatórios')
  })
})
