import mongoose, { Document, Schema } from 'mongoose'
import { string } from 'zod'

export interface IServiceModel extends Document {
  description: string
  serviceDate: Date
  vehicleId: string
  clientId: string
  status: 'pending' | 'completed' | 'canceled'
  price: number
}

const serviceSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  serviceDate: {
    type: Date,
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
  },
  price: {
    type: Number,
    required: true,
  },
})

export const ServiceModel = mongoose.model<IServiceModel>(
  'Service',
  serviceSchema,
)
