import { z } from 'zod'
import { Types } from 'mongoose'

const dateStringToDate = (dateString: string | undefined): Date | undefined => {
  if (dateString === undefined) return undefined
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? undefined : date
}

const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  })
  .transform((value) => new Types.ObjectId(value))

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
