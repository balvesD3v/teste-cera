import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { UpdateServiceUseCase } from '../../application/use-cases/update-service.usecase'
import { ServiceMapper } from '../repositories/mappers/service.mapper'

export class UpdateServiceController {
  constructor(private readonly updateServiceUseCase: UpdateServiceUseCase) {}

  public async updateService(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updateData = { ...req.body, id }

    try {
      const service = ServiceMapper.toDomain(updateData)
      const updatedService = await this.updateServiceUseCase.execute(service)

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
