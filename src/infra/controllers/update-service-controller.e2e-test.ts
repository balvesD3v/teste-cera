import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import { env } from '../env/env'
import { ServiceModel } from '../models/service.model'
import app from '../app'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

describe('UpdateServiceController E2E', () => {
  let testServiceId: unknown

  beforeAll(async () => {
    await mongoose.connect(env.DATABASE_URL)

    const service = await ServiceModel.create({
      _id: new UniqueEntityId(),
      description: 'Initial description',
      serviceDate: new Date().toISOString(),
      vehicleId: 'veh-123',
      clientId: 'cli-123',
      status: 'pending',
      price: 100,
    })

    testServiceId = service._id
  })

  afterAll(async () => {
    await ServiceModel.deleteMany()
    await mongoose.disconnect()
  })

  it('should update a service and return 200', async () => {
    const response = await request(app)
      .put(`/api/services/${testServiceId}`)
      .send({
        description: 'Updated description',
        serviceDate: new Date().toISOString(),
        vehicleId: 'veh-456',
        clientId: 'cli-456',
        status: 'completed',
        price: 150,
      })

    console.log('Response Body:', response.body)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('value')
    expect(response.body.value).toHaveProperty('service')

    const updatedService = response.body.value.service

    expect(updatedService).toEqual(
      expect.objectContaining({
        _id: {
          value: testServiceId,
        },
        props: expect.objectContaining({
          description: 'Updated description',
          vehicleId: 'veh-456',
          clientId: 'cli-456',
          status: 'completed',
          price: 150,
        }),
      }),
    )
  })

  it('should return 400 if the service ID is invalid', async () => {
    const response = await request(app).put('/api/services/invalid-id').send({
      description: 'Updated description',
      serviceDate: new Date().toISOString(),
      vehicleId: 'veh-456',
      clientId: 'cli-456',
      status: 'completed',
      price: 150,
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Serviço não existe')
  })
})
