import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { GetServicesByFiltersUseCase } from '../../domain/application/use-cases/get-by-filters-service.usecase'
import { GetServicesByFiltersController } from './get-by-filters-service.controller'

vi.mock('../../domain/application/use-cases/get-by-filters-service.usecase')

describe('GetServicesByFiltersController', () => {
  const app = express()
  app.use(express.json())

  const getServicesByFiltersUseCaseMock = {
    execute: vi.fn(),
  }

  const getServicesByFiltersController = new GetServicesByFiltersController(
    getServicesByFiltersUseCaseMock as unknown as GetServicesByFiltersUseCase,
  )

  app.get('/services', (req: Request, res: Response) => {
    return getServicesByFiltersController.handle(req, res)
  })

  it('should retrieve 200 and the list of services when filters are valid', async () => {
    const servicesMock = [
      {
        getId: () => 'service123',
        clientId: { toValue: () => 'client123' },
        vehicleId: { toValue: () => 'vehicle123' },
        description: 'Serviço de teste',
        price: 100,
        serviceDate: new Date('2024-01-01T10:00:00.000Z'),
        status: 'Concluído',
      },
    ]

    const mockResponse = {
      isLeft: () => false,
      value: { services: servicesMock },
    }

    getServicesByFiltersUseCaseMock.execute.mockResolvedValue(mockResponse)

    const response = await request(app).get('/services').query({
      clientId: 'client123',
      vehicleId: 'vehicle123',
      status: 'Concluído',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: 'service123',
        clientId: 'client123',
        vehicleId: 'vehicle123',
        description: 'Serviço de teste',
        price: '100',
        serviceDate: '2024-01-01T10:00:00.000Z',
        status: 'Concluído',
      },
    ])
  })

  it('should retrieve 400 when an error occurs in the use case', async () => {
    const mockErrorResponse = {
      isLeft: () => true,
      value: new Error('Invalid filter data'),
    }

    getServicesByFiltersUseCaseMock.execute.mockResolvedValue(mockErrorResponse)

    const response = await request(app).get('/services').query({
      clientId: 'invalid-client',
      vehicleId: 'invalid-vehicle',
      status: 'Concluído',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid filter data' })
  })
})
