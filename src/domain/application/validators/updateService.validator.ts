import { z } from 'zod'

const objectIdSchema = z.string().length(24, 'ID deve ter 24 caracteres')

export const updateServiceSchema = z.object({
  description: z.string().optional(),
  serviceDate: z
    .string()
    .optional()
    .transform((dateString) => {
      if (!dateString) return undefined
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error('Data inválida')
      }
      return date
    }),
  vehicleId: objectIdSchema.optional(),
  clientId: objectIdSchema.optional(),
  status: z.enum(['pending', 'completed', 'canceled']),
  price: z.number().positive('Preço deve ser um valor positivo').optional(),
})
