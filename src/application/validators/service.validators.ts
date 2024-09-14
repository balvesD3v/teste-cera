import { z } from 'zod'
import { dateStringToDate } from '../../utils/dateToStringToDate.utils'
import { objectIdSchema } from '../../utils/object.utils'

export const serviceSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  serviceDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Data inválida',
    })
    .transform(dateStringToDate),
  vehicleId: objectIdSchema,
  clientId: objectIdSchema,
  status: z.enum(['pending', 'completed', 'canceled']),
  price: z.number().positive('Preço deve ser um valor positivo'),
})

export const updateServiceSchema = serviceSchema.partial()
