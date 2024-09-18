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

    return res.status(201).json({
      id: result.value.service.id.toString(),
      clientId: result.value.service.clientId.toValue(),
      vehicleId: result.value.service.vehicleId.toValue(),
      description: result.value.service.description.toString(),
      price: result.value.service.price.toString(),
      serviceDate: result.value.service.serviceDate,
      status: result.value.service.status,
    })
  }
}
