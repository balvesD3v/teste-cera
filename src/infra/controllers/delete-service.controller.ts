import { DeleteServiceUseCase } from '@/domain/application/use-cases/delete-service.usecase'
import { Request, Response } from 'express'

export class DeleteServiceController {
  constructor(private readonly deleteServiceUseCase: DeleteServiceUseCase) {}

  public async deleteService(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const deleteServiceRequest = {
      serviceId: id,
    }

    const deletedService =
      await this.deleteServiceUseCase.execute(deleteServiceRequest)

    res.status(200).json(deletedService)
  }
}
