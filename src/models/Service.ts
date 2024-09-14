import mongoose, { Document, Schema } from 'mongoose'

export interface IService extends Document {
  description: string
  serviceDate: Date
  vehicleId: mongoose.Types.ObjectId
  clientId: mongoose.Types.ObjectId
  status: 'pending' | 'completed' | 'cancelled'
  price: number
}

const ServiceSchema: Schema = new Schema({
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
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<IService>('Service', ServiceSchema)
