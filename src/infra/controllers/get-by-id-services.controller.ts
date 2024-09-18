import { Request, Response } from 'express'
import { GetByIdServiceUseCase } from '../../domain/application/use-cases/get-by-id-service.usecase'
import { isValidId } from '../utils/id-validator'
import { BadRequestException } from '../../core/errors/errors/BadRequestException'

export class GetByIdServiceController {
  constructor(private readonly getByIdServiceUseCase: GetByIdServiceUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    // if (!isValidId(id)) {
    //   const error = new BadRequestException('Serviço não existe')
    //   return res.status(400).json({ message: error.message })
    // }

    const result = await this.getByIdServiceUseCase.execute({
      serviceId: id,
    })

    if (result.isLeft()) {
      return res.status(400).json({ message: result.value.message })
    }

    return res.status(200).json(result.value.service)
  }
}
