import { Request, Response } from 'express'

export class DeleteServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  public async deleteService(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const deletedService = await this.serviceRepository.delete(id)

      if (!deletedService) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      return res.status(200).json({ message: 'Serviço deletado com sucesso' })
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
