import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import app from '../app'
import { ServiceModel } from '../models/service.model'

describe('DeleteServiceController', () => {
  let serviceId: string

  beforeAll(async () => {
    const response = await request(app).post('/api/services').send({
      description: 'Test service',
      serviceDate: new Date().toISOString(),
      vehicleId: 'veh-123',
      clientId: 'cli-123',
      status: 'pending',
      price: 100,
    })

    serviceId = response.body.value.service._id.value
  })

  beforeEach(async () => {
    await ServiceModel.deleteMany({})

    await new Promise((resolve) => setTimeout(resolve, 500))
  })

  afterAll(async () => {
    await request(app).delete(`/api/services/${serviceId}`)
  })

  it('should delete a service and return 200', async () => {
    const response = await request(app).delete(`/api/services/${serviceId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty(
      'message',
      'Serviço deletado com sucesso',
    )
  })

  it('should return 400 if the service ID is invalid', async () => {
    const invalidId = 'invalid-id'
    const response = await request(app).delete(`/api/services/${invalidId}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Serviço não existe')
  })
})
