import { Request, Response } from 'express'
import { GetByIdServiceUseCase } from '../../domain/application/use-cases/get-by-id-service.usecase'
import { isValidId } from '../utils/id-validator'
import { BadRequestException } from '../../core/errors/errors/BadRequestException'
import { ServiceNotFoundError } from '../../core/errors/errors/ServiceNotFoundError'

export class GetByIdServiceController {
  constructor(private readonly getByIdServiceUseCase: GetByIdServiceUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    if (!isValidId(id)) {
      const error = new BadRequestException('ID inválido')
      return res.status(400).json({ message: error.message })
    }

    const result = await this.getByIdServiceUseCase.execute({ serviceId: id })

    if (result.isLeft()) {
      const error = result.value
      if (error instanceof ServiceNotFoundError) {
        return res.status(404).json({ message: 'Serviço não encontrado' })
      }
      return res.status(400).json({ message: error.message })
    }

    const service = result.value.service

    const response = {
      id: service.getId().toString(),
      clientId: service.clientId.toValue(),
      vehicleId: service.vehicleId.toValue(),
      description: service.description,
      price: service.price.toString(),
      serviceDate: service.serviceDate.toISOString(),
      status: service.status,
    }

    return res.status(200).json(response)
  }
}
