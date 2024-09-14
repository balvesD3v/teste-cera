import { Request, Response } from 'express'
import Service from '../models/Service'

export const getAllService = async (req: Request, res: Response) => {
  try {
    const services = await Service.find()
    return res.status(200).json(services)
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
