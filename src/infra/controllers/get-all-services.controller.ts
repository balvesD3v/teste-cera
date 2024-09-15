import { Request, Response } from 'express'
import { ServiceRepository } from '../../domain/repositories/service.repository'

export class GetAllServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  public async getAllService(req: Request, res: Response): Promise<Response> {
    try {
      const services = await this.serviceRepository.findAll()
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
