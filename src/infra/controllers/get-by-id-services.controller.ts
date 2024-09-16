import { Request, Response } from 'express'
import { GetByIdServiceUseCase } from '../../domain/application/use-cases/get-by-id-service.usecase'

export class GetByIdServiceController {
  constructor(private readonly getByIdServiceUseCase: GetByIdServiceUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = await this.getByIdServiceUseCase.execute({
        serviceId: id,
      })

      if (!service) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
