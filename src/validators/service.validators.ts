import { z } from 'zod'

export const serviceSchema = z.object({
  description: z
    .string()
    .min(5, 'A descrição deve ter no mínimo 5 caracteres.'),
  serviceDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'A data do serviço deve ser uma data válida.',
  }),
  vehicleId: z
    .string()
    .length(24, 'O ID do veículo deve ser um ObjectId válido.'),
  clientId: z
    .string()
    .length(24, 'O ID do cliente deve ser um ObjectId válido.'),
  status: z.enum(['pending', 'completed', 'canceled']),
  price: z.number().positive('O preço deve ser um número positivo.'),
})
