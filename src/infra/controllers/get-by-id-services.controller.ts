import { Request, Response } from 'express'
import { ServiceRepository } from '../../domain/enterprise/repositories/service.repository'

export class GetByIdServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  getByIdService = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const service = await this.serviceRepository.findById(id)

      if (!service) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
