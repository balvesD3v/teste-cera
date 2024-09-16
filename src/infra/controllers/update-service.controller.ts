import { Request, Response } from 'express'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'

export class UpdateServiceController {
  constructor(private readonly updateServiceUseCase: UpdateServiceUseCase) {}

  async updateService(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { description, serviceDate, vehicleId, clientId, status, price } =
        req.body

      if (!id) {
        res.status(400).json({ error: 'ID do serviço é obrigatório' })
        return
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

      const updatedService =
        await this.updateServiceUseCase.execute(updateServiceRequest)

      res.status(200).json(updatedService)
    } catch (error) {
      console.error('Error updating service:', error)
      res.status(500).json({ error: 'Erro ao atualizar o serviço' })
    }
  }
}
