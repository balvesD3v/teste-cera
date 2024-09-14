import { Request, Response } from 'express'
import Service from '../models/Service'
import { serviceSchema } from '../validators/service.validators'
import { ZodError } from 'zod'
import { ServiceRepository } from '../repositories/service.repository'

export class CreateServiceController {
  private serviceRepository: ServiceRepository

  constructor() {
    this.serviceRepository = new ServiceRepository()
  }

  public async createService(req: Request, res: Response): Promise<Response> {
    try {
      const validateDate = serviceSchema.parse(req.body)

      const newService = new Service(validateDate)

      await newService.save()

      return res.status(201).json(newService)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors })
      }

      return res
        .status(500)
        .json({ error: 'Erro intero do servidor, tente novamente mais tarde!' })
    }
  }
}
