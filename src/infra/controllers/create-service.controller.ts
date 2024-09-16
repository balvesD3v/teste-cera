import { Request, Response } from 'express'
import { CreateServiceUseCase } from '../../domain/application/use-cases/create-service.usecase'

export class CreateServiceController {
  constructor(private readonly createServiceUseCase: CreateServiceUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { description, serviceDate, vehicleId, clientId, status, price } =
      req.body

    const service = await this.createServiceUseCase.execute({
      description,
      serviceDate,
      vehicleId,
      clientId,
      status,
      price,
    })

    return res.status(201).json(service)
  }
}
