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

    try {
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
        _id: {
          value: service.getId(), // Use getId() para obter o valor do _id
        },
        props: {
          description: service.description,
          clientId: {
            value: service.clientId.toValue(), // Use toValue() para obter o valor do clientId
          },
          vehicleId: {
            value: service.vehicleId.toValue(), // Use toValue() para obter o valor do vehicleId
          },
          price: service.price,
          serviceDate: service.serviceDate.toISOString(), // Formatar a data como string ISO
          status: service.status,
        },
      }

      return res.status(200).json({ value: { service: response } })
    } catch (error) {
      // Adiciona tratamento para erros inesperados
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
