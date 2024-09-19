import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express, { Request, Response } from 'express'
import { DeleteServiceUseCase } from '../../domain/application/use-cases/delete-service.usecase'
import { isValidId } from '../utils/id-validator'
import { DeleteServiceController } from './delete-service.controller'

vi.mock('../../domain/application/use-cases/delete-service.usecase')
vi.mock('../utils/id-validator')

describe('DeleteServiceController', () => {
  const app = express()
  app.use(express.json())

  const deleteServiceUseCaseMock = {
    execute: vi.fn(),
  }

  const deleteServiceController = new DeleteServiceController(
    deleteServiceUseCaseMock as unknown as DeleteServiceUseCase,
  )

  app.delete('/services/:id', (req: Request, res: Response) => {
    return deleteServiceController.handle(req, res)
  })

  it('should retrieve 200 when service is successfully deleted', async () => {
    vi.mocked(isValidId).mockReturnValue(true)

    deleteServiceUseCaseMock.execute.mockResolvedValue({})

    const validServiceId = '123'

    const response = await request(app).delete(`/services/${validServiceId}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Serviço deletado com sucesso' })
    expect(deleteServiceUseCaseMock.execute).toHaveBeenCalledWith({
      serviceId: validServiceId,
    })
  })

  it('should retrieve 400 when service ID is invalid', async () => {
    vi.mocked(isValidId).mockReturnValue(false)

    const invalidServiceId = 'invalid-id'

    const response = await request(app).delete(`/services/${invalidServiceId}`)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Serviço não existe' })
  })
})
