import { Request, Response } from 'express'
import { GetByIdServiceUseCase } from '../../domain/application/use-cases/get-by-id-service.usecase'

export class GetByIdServiceController {
  constructor(private readonly getByIdServiceUseCase: GetByIdServiceUseCase) {}

  getByIdService = async (req: Request, res: Response) => {
    const { id } = req.params

    const service = await this.getByIdServiceUseCase.execute({ serviceId: id })

    return res.status(200).json(service)
  }
}
