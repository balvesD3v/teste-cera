import { Request, Response } from 'express'
import { CreateServiceUseCase } from '../../domain/application/use-cases/create-service.usecase'

export class CreateServiceController {
  constructor(private readonly createServiceUseCase: CreateServiceUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { description, serviceDate, vehicleId, clientId, status, price } =
      req.body

    const result = await this.createServiceUseCase.execute({
      description,
      serviceDate,
      vehicleId,
      clientId,
      status,
      price,
    })

    if (result.isLeft()) {
      return res.status(400).json({ message: result.value.message })
    }

    const service = result.value.service

    return res.status(201).json({
      id: service.id.toString(),
      clientId: service.clientId.toValue(),
      vehicleId: service.vehicleId.toValue(),
      description: service.description.toString(),
      price: service.price.toString(),
      serviceDate: service.serviceDate,
      status: service.status,
    })
  }
}
