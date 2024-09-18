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

    console.log(result)

    return res.status(201).json(result)
  }
}
