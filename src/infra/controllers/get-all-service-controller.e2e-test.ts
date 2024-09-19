import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { GetAllServiceUseCase } from '../../domain/application/use-cases/get-all-service.usecase'
import { GetAllServiceController } from './get-all-services.controller'

vi.mock('../../domain/application/use-cases/get-all-service.usecase')

describe('GetAllServiceController', () => {
  const app = express()
  app.use(express.json())

  const getAllServiceUseCaseMock = {
    execute: vi.fn(),
  }

  const getAllServiceController = new GetAllServiceController(
    getAllServiceUseCaseMock as unknown as GetAllServiceUseCase,
  )

  app.get('/services', (req: Request, res: Response) => {
    return getAllServiceController.handle(req, res)
  })

  it('should retrieve 200 and return a list of services', async () => {
    const mockServices = [
      {
        id: 'service1',
        clientId: { toValue: () => 'client1' },
        vehicleId: { toValue: () => 'vehicle1' },
        description: 'Serviço 1',
        price: 100,
        serviceDate: '2024-09-18',
        status: 'pending',
      },
      {
        id: 'service2',
        clientId: { toValue: () => 'client2' },
        vehicleId: { toValue: () => 'vehicle2' },
        description: 'Serviço 2',
        price: 200,
        serviceDate: '2024-09-19',
        status: 'completed',
      },
    ]

    const mockResponse = {
      isLeft: () => false,
      value: { services: mockServices },
    }

    getAllServiceUseCaseMock.execute.mockResolvedValue(mockResponse)

    const response = await request(app).get('/services')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      services: [
        {
          id: 'service1',
          clientId: 'client1',
          vehicleId: 'vehicle1',
          description: 'Serviço 1',
          price: '100',
          serviceDate: '2024-09-18',
          status: 'pending',
        },
        {
          id: 'service2',
          clientId: 'client2',
          vehicleId: 'vehicle2',
          description: 'Serviço 2',
          price: '200',
          serviceDate: '2024-09-19',
          status: 'completed',
        },
      ],
    })
    expect(getAllServiceUseCaseMock.execute).toHaveBeenCalled()
  })

  it('should retrieve 400 if there is an error in the use case', async () => {
    const mockErrorResponse = {
      isLeft: () => true,
      value: new Error('Erro ao buscar serviços'),
    }

    getAllServiceUseCaseMock.execute.mockResolvedValue(mockErrorResponse)

    const response = await request(app).get('/services')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Erro ao buscar serviços' })
  })
})
