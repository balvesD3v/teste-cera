import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { CreateServiceUseCase } from '../../domain/application/use-cases/create-service.usecase'

export class CreateServiceController {
  constructor(private readonly createServiceUseCase: CreateServiceUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { description, serviceDate, vehicleId, clientId, status, price } =
      req.body

    try {
      const service = await this.createServiceUseCase.execute({
        description,
        serviceDate,
        vehicleId,
        clientId,
        status,
        price,
      })

      return res.status(201).json(service)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors })
      }

      return res
        .status(500)
        .json({ error: 'Erro intero do servidor, tente novamente mais tarde!' })
    }
  }
}
