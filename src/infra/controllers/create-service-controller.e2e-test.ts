import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { CreateServiceUseCase } from '../../domain/application/use-cases/create-service.usecase'
import { CreateServiceController } from './create-service.controller'

vi.mock('../../domain/application/use-cases/create-service.usecase')

describe('CreateServiceController', () => {
  const app = express()
  app.use(express.json())

  const createServiceUseCaseMock = {
    execute: vi.fn(),
  }

  const createServiceController = new CreateServiceController(
    createServiceUseCaseMock as unknown as CreateServiceUseCase,
  )

  app.post('/services', (req: Request, res: Response) => {
    return createServiceController.handle(req, res)
  })

  it('should retrieve 201 when the service is successfully created', async () => {
    const mockService = {
      id: '123',
      clientId: { toValue: () => 'client123' },
      vehicleId: { toValue: () => 'vehicle123' },
      description: 'Novo serviço',
      price: 100,
      serviceDate: '2024-09-18',
      status: 'pending',
    }

    const mockResponse = {
      isLeft: () => false,
      value: { service: mockService },
    }

    createServiceUseCaseMock.execute.mockResolvedValue(mockResponse)

    const requestBody = {
      description: 'Novo serviço',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'pending',
      price: 100,
    }

    const response = await request(app).post('/services').send(requestBody)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: '123',
      clientId: 'client123',
      vehicleId: 'vehicle123',
      description: 'Novo serviço',
      price: '100',
      serviceDate: '2024-09-18',
      status: 'pending',
    })

    expect(createServiceUseCaseMock.execute).toHaveBeenCalledWith(requestBody)
  })

  it('should retrieve 400 when there is an error in the use case execution', async () => {
    const mockErrorResponse = {
      isLeft: () => true,
      value: new Error('Erro ao criar serviço'),
    }

    createServiceUseCaseMock.execute.mockResolvedValue(mockErrorResponse)

    const requestBody = {
      description: 'Novo serviço',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'pending',
      price: 100,
    }

    const response = await request(app).post('/services').send(requestBody)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Erro ao criar serviço' })
  })
})
