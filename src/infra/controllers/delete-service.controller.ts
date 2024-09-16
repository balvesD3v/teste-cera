import { Request, Response } from 'express'
import { DeleteServiceUseCase } from '../../domain/application/use-cases/delete-service.usecase'
import { ServiceNotFoundError } from '../../core/errors/errors/ServiceNotFoundError'
import { isValidId } from '../utils/id-validator'
import { BadRequestException } from '../../core/errors/errors/BadRequestException'

export class DeleteServiceController {
  constructor(private readonly deleteServiceUseCase: DeleteServiceUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    if (!isValidId(id)) {
      const error = new BadRequestException('Serviço não existe')
      return res.status(400).json({ message: error.message })
    }

    const deleteServiceRequest = {
      serviceId: id,
    }

    const result = await this.deleteServiceUseCase.execute(deleteServiceRequest)

    if (result.isLeft()) {
      if (result.value instanceof ServiceNotFoundError) {
        return res.status(404).json({ error: result.value.message })
      }

      return res.status(400).json({ error: 'Um erro inesperado ocorreu' })
    }

    return res.status(200).json({ message: 'Serviço deletado com sucesso' })
  }
}
