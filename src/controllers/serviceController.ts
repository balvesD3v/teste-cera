import { Request, Response } from "express";
import Service from "../models/Service";

export const createService = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { description, serviceDate, vehicleId, clientId, status, price } = req.body

        if (!description || !serviceDate || !vehicleId || !clientId || !price) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' })
        }

        const newService = new Service({
            description,
            serviceDate,
            vehicleId,
            clientId,
            status,
            price
        })

        const savedService = await newService.save()

        return res.status(201).json({ message: 'Serviço criado com sucesso.', service: savedService })
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao criar o serviço.', error: error.message });
    }
}