import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import app from '../app'
import { env } from '../env/env'
import { ServiceModel } from '../models/service.model'

describe('CreateServiceController E2E', () => {
  beforeAll(async () => {
    await mongoose.connect(env.DATABASE_URL)
  })

  afterAll(async () => {
    await ServiceModel.deleteMany({})
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
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        clientId: 'cli-123',
        vehicleId: 'veh-123',
        description: 'Oil change',
        price: '100',
        serviceDate: expect.any(String),
        status: 'pending',
      }),
    )
  })

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/api/services').send({
      description: '',
      serviceDate: new Date().toISOString(),
      vehicleId: '',
      clientId: '',
      status: 'pending',
      price: 100,
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Todos os campos são obrigatórios')
  })
})
