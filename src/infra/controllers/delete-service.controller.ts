import { Request, Response } from 'express'
import { DeleteServiceUseCase } from '../../domain/application/use-cases/delete-service.usecase'

export class DeleteServiceController {
  constructor(private readonly deleteServiceUseCase: DeleteServiceUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const deleteServiceRequest = {
      serviceId: id,
    }

    const deletedService =
      await this.deleteServiceUseCase.execute(deleteServiceRequest)

    res.status(200).json(deletedService)
  }
}
