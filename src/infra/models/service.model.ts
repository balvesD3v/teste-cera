import mongoose, { Document, Schema } from 'mongoose'

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
    type: String,
    required: true,
  },
  clientId: {
    type: String,
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
