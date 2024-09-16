import { Request, Response } from 'express'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'

export class UpdateServiceController {
  constructor(private readonly updateServiceUseCase: UpdateServiceUseCase) {}

  async updateService(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id // Extrai o ID dos parâmetros da requisição
      const { description, serviceDate, vehicleId, clientId, status, price } =
        req.body

      // Verifica se o ID foi fornecido
      if (!id) {
        res.status(400).json({ error: 'ID do serviço é obrigatório' })
        return
      }

      // Cria o request do use case
      const updateServiceRequest = {
        serviceId: id,
        description,
        serviceDate,
        vehicleId, // Assumindo que este valor é fornecido como string ou UUID
        clientId, // Assumindo que este valor é fornecido como string ou UUID
        status,
        price,
      }

      // Chama o use case
      const updatedService =
        await this.updateServiceUseCase.execute(updateServiceRequest)

      res.status(200).json(updatedService)
    } catch (error) {
      console.error('Error updating service:', error)
      res.status(500).json({ error: 'Erro ao atualizar o serviço' })
    }
  }
}
