import { Request, Response } from 'express'
import Service from '../models/Service'

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const service = await Service.findByIdAndUpdate(id)

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' })
    }

    return res.status(200).json(service)
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
