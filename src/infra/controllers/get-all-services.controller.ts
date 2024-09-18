import { Request, Response } from 'express'
import { GetAllServiceUseCase } from '../../domain/application/use-cases/get-all-service.usecase'

export class GetAllServiceController {
  constructor(private readonly getAllServiceUseCase: GetAllServiceUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.getAllServiceUseCase.execute()

    if (result.isLeft()) {
      return res.status(400).json({ message: result.value.message })
    }

    const services = result.value.services.map((service) => ({
      id: service.id.toString(),
      clientId: service.clientId.toValue(),
      vehicleId: service.vehicleId.toValue(),
      description: service.description,
      price: service.price.toString(),
      serviceDate: service.serviceDate,
      status: service.status,
    }))

    return res.status(200).json({ services })
  }
}
