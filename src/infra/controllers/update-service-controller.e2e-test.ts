import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'
import { isValidId } from '../utils/id-validator'
import { UpdateServiceController } from './update-service.controller'
import { BadRequestException } from '../../core/errors/errors/BadRequestException'

vi.mock('../../domain/application/use-cases/update-service.usecase')
vi.mock('../utils/id-validator')

describe('UpdateServiceController', () => {
  const app = express()
  app.use(express.json())

  const updateServiceUseCaseMock = {
    execute: vi.fn(),
  }

  const updateServiceController = new UpdateServiceController(
    updateServiceUseCaseMock as unknown as UpdateServiceUseCase,
  )

  app.put('/services/:id', (req: Request, res: Response) => {
    return updateServiceController.handle(req, res)
  })

  it('should retrieve 200 and update the service when the request is valid', async () => {
    vi.mocked(isValidId).mockReturnValue(true)

    const mockService = {
      id: '123',
      clientId: 'client123',
      vehicleId: 'vehicle123',
      description: 'Serviço atualizado',
      price: 100,
      serviceDate: '2024-09-18',
      status: 'Concluído',
    }

    const mockResponse = {
      isLeft: () => false,
      value: { service: mockService },
    }

    updateServiceUseCaseMock.execute.mockResolvedValue(mockResponse)

    const validServiceId = '123'
    const requestBody = {
      description: 'Serviço atualizado',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'Concluído',
      price: 100,
    }

    const response = await request(app)
      .put(`/services/${validServiceId}`)
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: '123',
      clientId: 'client123',
      vehicleId: 'vehicle123',
      description: 'Serviço atualizado',
      price: 100,
      serviceDate: '2024-09-18',
      status: 'Concluído',
    })

    expect(updateServiceUseCaseMock.execute).toHaveBeenCalledWith({
      serviceId: validServiceId,
      ...requestBody,
    })
  })

  it('should retrieve 400 when ID is invalid', async () => {
    vi.mocked(isValidId).mockReturnValue(false)

    const invalidServiceId = 'invalid-id'
    const requestBody = {
      description: 'Serviço atualizado',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'Concluído',
      price: 100,
    }

    const response = await request(app)
      .put(`/services/${invalidServiceId}`)
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Serviço não existe' })
  })

  it('should retrieve 400 when use case execution returns an error', async () => {
    vi.mocked(isValidId).mockReturnValue(true)

    const validServiceId = '123'
    const requestBody = {
      description: 'Serviço atualizado',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'Concluído',
      price: 100,
    }

    const mockErrorResponse = {
      isLeft: () => true,
      value: new BadRequestException('Erro ao atualizar serviço'),
    }

    updateServiceUseCaseMock.execute.mockResolvedValue(mockErrorResponse)

    const response = await request(app)
      .put(`/services/${validServiceId}`)
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Erro ao atualizar serviço' })
  })
})
