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

    await ServiceModel.create([
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
  })

  beforeEach(async () => {
    // Clear the services collection before each test
    await ServiceModel.deleteMany({})

    await new Promise((resolve) => setTimeout(resolve, 500))
  })

  afterAll(async () => {
    await mongoose.disconnect() // Desconecta do banco de dados
  })

  it('should retrieve all services and return 200', async () => {
    const response = await request(app).get('/api/services')

    console.log('Response Body:', response.body) // Adicione este log para inspecionar a resposta

    // Verifique se a resposta tem o status 200
    expect(response.status).toBe(200)
    // Verifique a estrutura da resposta com base no formato fornecido
    expect(response.body).toHaveProperty('value')
    expect(response.body.value).toHaveProperty('services')
    expect(response.body.value.services).toHaveLength(2) // Verifique se há exatamente dois serviços

    const services = response.body.value.services

    // Verifique os detalhes dos serviços retornados
    expect(services[0]).toHaveProperty('_id')
    expect(services[0]).toHaveProperty('props')
    expect(services[0].props).toHaveProperty('description', 'Oil change')

    expect(services[1]).toHaveProperty('_id')
    expect(services[1]).toHaveProperty('props')
    expect(services[1].props).toHaveProperty('description', 'Tire replacement')
  })
})
