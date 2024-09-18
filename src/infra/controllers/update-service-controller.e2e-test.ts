import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'
import { isValidId } from '../utils/id-validator'
import { UpdateServiceController } from './update-service.controller'

// Mockando o updateServiceUseCase e a função isValidId
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

  // Definindo uma rota para o teste e2e
  app.put('/services/:id', (req: Request, res: Response) => {
    return updateServiceController.handle(req, res)
  })

  it('should retrive 200 when request is valid', async () => {
    // Mockando a validação de ID
    vi.mocked(isValidId).mockReturnValue(true)

    // Mockando a execução do use case
    const mockResponse = { success: true }
    updateServiceUseCaseMock.execute.mockResolvedValue(mockResponse)

    const validServiceId = '123'
    const requestBody = {
      description: 'Serviço atualizado',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'completed',
      price: 100,
    }

    // Simulando a requisição HTTP
    const response = await request(app)
      .put(`/services/${validServiceId}`)
      .send(requestBody)

    // Verificando se o status é 200 e a resposta está correta
    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockResponse)
    expect(updateServiceUseCaseMock.execute).toHaveBeenCalledWith({
      serviceId: validServiceId,
      ...requestBody,
    })
  })

  it('should retrive 400 when ID is invalid', async () => {
    // Mockando a validação de ID como inválida
    vi.mocked(isValidId).mockReturnValue(false)

    const invalidServiceId = 'invalid-id'
    const requestBody = {
      description: 'Serviço atualizado',
      serviceDate: '2024-09-18',
      vehicleId: 'vehicle123',
      clientId: 'client123',
      status: 'completed',
      price: 100,
    }

    const response = await request(app)
      .put(`/services/${invalidServiceId}`)
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Serviço não existe' })
  })
})
