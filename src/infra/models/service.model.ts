import mongoose, { Document, Schema } from 'mongoose'

export interface IServiceModel extends Document {
  description: string
  serviceDate: Date
  vehicleId: string
  clientId: string
  status: 'Pendente' | 'Em Andamento' | 'Concluído'
  price: number
}

const serviceSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
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
    enum: ['Pendente', 'Em Andamento', 'Concluído'],
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
