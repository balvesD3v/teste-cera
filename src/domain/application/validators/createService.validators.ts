import { objectIdSchema } from '@/infra/utils/object.utils'
import { z } from 'zod'

export const serviceSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  serviceDate: z
    .string()
    .min(1, 'Data é obrigatória')
    .transform((dateString) => {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error('Data inválida')
      }
      return date
    }),
  vehicleId: objectIdSchema,
  clientId: objectIdSchema,
  status: z.enum(['pending', 'completed', 'canceled']),
  price: z.number().positive('Preço deve ser um valor positivo'),
})

export const updateServiceSchema = serviceSchema.partial()
