import { Types } from 'mongoose'
import { z } from 'zod'

export const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  })
  .transform((value) => new Types.ObjectId(value))
