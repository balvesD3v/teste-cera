import { Request, Response } from 'express'
import { z } from 'zod'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'
import { updateServiceSchema } from '../../domain/application/validators/createService.validators'

export class UpdateServiceController {
  constructor(private readonly updateServiceUseCase: UpdateServiceUseCase) {}

  public async updateService(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updates = req.body

    try {
      const validatedUpdates = updateServiceSchema.parse(updates)

      const updatedService = await this.updateServiceUseCase.execute(
        id,
        validatedUpdates,
      )

      if (!updatedService) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      return res.status(200).json(updatedService)
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }
}
