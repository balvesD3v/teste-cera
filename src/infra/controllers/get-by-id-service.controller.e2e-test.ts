import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { GetByIdServiceUseCase } from '../../domain/application/use-cases/get-by-id-service.usecase'
import { ServiceNotFoundError } from '../../core/errors/errors/ServiceNotFoundError'
import { isValidId } from '../utils/id-validator'
import { GetByIdServiceController } from './get-by-id-services.controller'

vi.mock('../../domain/application/use-cases/get-by-id-service.usecase')
vi.mock('../utils/id-validator')

describe('GetByIdServiceController', () => {
  const app = express()
  app.use(express.json())

  const getByIdServiceUseCaseMock = {
    execute: vi.fn(),
  }

  const getByIdServiceController = new GetByIdServiceController(
    getByIdServiceUseCaseMock as unknown as GetByIdServiceUseCase,
  )

  app.get('/services/:id', (req: Request, res: Response) => {
    return getByIdServiceController.handle(req, res)
  })

  it('should retrieve 200 and the service data when ID is valid', async () => {
    vi.mocked(isValidId).mockReturnValue(true)

    const serviceMock = {
      getId: () => 'service123',
      description: 'Serviço de teste',
      clientId: { toValue: () => 'client123' },
      vehicleId: { toValue: () => 'vehicle123' },
      price: 100,
      serviceDate: new Date('2024-01-01T10:00:00.000Z'),
      status: 'completed',
    }

    const mockResponse = {
      isLeft: () => false,
      value: { service: serviceMock },
    }

    getByIdServiceUseCaseMock.execute.mockResolvedValue(mockResponse)

    const response = await request(app).get('/services/service123')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 'service123',
      clientId: 'client123',
      vehicleId: 'vehicle123',
      description: 'Serviço de teste',
      price: '100',
      serviceDate: '2024-01-01T10:00:00.000Z',
      status: 'completed',
    })
  })

  it('should retrieve 400 when ID is invalid', async () => {
    vi.mocked(isValidId).mockReturnValue(false)

    const response = await request(app).get('/services/invalid-id')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'ID inválido' })
  })

  it('should retrieve 404 when the service is not found', async () => {
    vi.mocked(isValidId).mockReturnValue(true)

    const mockErrorResponse = {
      isLeft: () => true,
      value: new ServiceNotFoundError(),
    }

    getByIdServiceUseCaseMock.execute.mockResolvedValue(mockErrorResponse)

    const response = await request(app).get('/services/non-existent-id')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Serviço não encontrado' })
  })
})
