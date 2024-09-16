import { Request, Response } from 'express'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'
import { BadRequestException } from '../../core/errors/errors/BadRequestException'
import { isValidId } from '../utils/id-validator'

export class UpdateServiceController {
  constructor(private readonly updateServiceUseCase: UpdateServiceUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { description, serviceDate, vehicleId, clientId, status, price } =
      req.body

    if (!isValidId(id)) {
      const error = new BadRequestException('Serviço não existe')
      return res.status(400).json({ message: error.message })
    }

    const updateServiceRequest = {
      serviceId: id,
      description,
      serviceDate,
      vehicleId,
      clientId,
      status,
      price,
    }

    const result = await this.updateServiceUseCase.execute(updateServiceRequest)

    if (result.isLeft()) {
      return res.status(400).json({ message: result.value.message })
    }

    return res.status(200).json(result)
  }
}
