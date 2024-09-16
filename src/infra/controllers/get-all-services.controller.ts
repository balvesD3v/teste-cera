import { Request, Response } from 'express'
import { GetAllServiceUseCase } from '../../domain/application/use-cases/get-all-service.usecase'

export class GetAllServiceController {
  constructor(private readonly getAllServiceUseCase: GetAllServiceUseCase) {}

  public async getAllService(req: Request, res: Response) {
    const services = await this.getAllServiceUseCase.execute()
    return res.status(200).json(services)
  }
}
