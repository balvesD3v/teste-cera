import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import mongoose from 'mongoose'
import { env } from '../env/env'
import { ServiceModel } from '../models/service.model'
import app from '../app'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

describe('GetAllServiceController E2E', () => {
  beforeAll(async () => {
    await mongoose.connect(env.DATABASE_URL)
  })

  beforeEach(async () => {
    await ServiceModel.deleteMany({})
    await new Promise((resolve) => setTimeout(resolve, 500))
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should retrieve all services and return 200', async () => {
    const services = await ServiceModel.create([
      {
        _id: new UniqueEntityId(),
        description: 'Oil change',
        serviceDate: new Date().toISOString(),
        vehicleId: 'veh-123',
        clientId: 'cli-123',
        status: 'pending',
        price: 100,
      },
      {
        _id: new UniqueEntityId(),
        description: 'Tire replacement',
        serviceDate: new Date().toISOString(),
        vehicleId: 'veh-456',
        clientId: 'cli-456',
        status: 'completed',
        price: 200,
      },
    ])

    expect(services).toHaveLength(2)

    const response = await request(app).get('/api/services')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('services')
    expect(response.body.services).toHaveLength(2)

    const sortedServices = response.body.services.sort(
      (a: { description: string }, b: { description: string }) =>
        a.description.localeCompare(b.description),
    )

    const [service1, service2] = sortedServices

    expect(service1).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        clientId: 'cli-123',
        vehicleId: 'veh-123',
        description: 'Oil change',
        price: expect.any(String),
        serviceDate: expect.any(String),
        status: 'pending',
      }),
    )

    expect(service2).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        clientId: 'cli-456',
        vehicleId: 'veh-456',
        description: 'Tire replacement',
        price: expect.any(String),
        serviceDate: expect.any(String),
        status: 'completed',
      }),
    )
  })
})
