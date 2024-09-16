import { ServiceRepository } from '@/domain/enterprise/repositories/service.repository'
import { Request, Response } from 'express'

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
