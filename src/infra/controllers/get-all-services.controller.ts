import { Request, Response } from 'express'
import { GetAllServiceUseCase } from '../../domain/application/use-cases/get-all-service.usecase'

export class GetAllServiceController {
  constructor(private readonly getAllServiceUseCase: GetAllServiceUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.getAllServiceUseCase.execute()

    if (result.isLeft()) {
      return res.status(400).json({ message: result.value.message })
    }

    return res.status(200).json(result)
  }
}
