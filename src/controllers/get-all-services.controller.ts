import { Request, Response } from 'express'
import Service from '../models/Service'
import { ServiceRepository } from '../repositories/service.repository'

export class ServiceGetAllController {
  private serviceRepository: ServiceRepository

  constructor() {
    this.serviceRepository = new ServiceRepository()
  }

  public async getAllService(req: Request, res: Response): Promise<Response> {
    try {
      const services = await Service.find()
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
