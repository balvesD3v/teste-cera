import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { Types } from 'mongoose'
import { ServiceRepository } from '../../domain/repositories/service.repository'
import { serviceSchema } from '../../application/validators/service.validators'

export class UpdateServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  private convertToObjectId(id: string | Types.ObjectId): Types.ObjectId {
    if (typeof id === 'string') {
      return new Types.ObjectId(id)
    }
    return id
  }

  public async updateService(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const validatedData = serviceSchema.partial().parse(req.body)

      if (validatedData.vehicleId) {
        validatedData.vehicleId = this.convertToObjectId(
          validatedData.vehicleId,
        )
      }
      if (validatedData.clientId) {
        validatedData.clientId = this.convertToObjectId(validatedData.clientId)
      }

      const updatedService = await this.serviceRepository.update(
        id,
        validatedData,
      )

      if (!updatedService) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      return res.status(200).json(updatedService)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors })
      }
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
