import mongoose from 'mongoose'
import { Service } from '../../../domain/entities/service.entity'
import { IServiceModel } from '../../models/service.model'

export class ServiceMapper {
  static toDomain(raw: IServiceModel): Service {
    if (!(raw._id instanceof mongoose.Types.ObjectId)) {
      throw new Error('ID do serviço não é do tipo ObjectId')
    }
    return new Service(
      raw.description,
      raw.serviceDate,
      raw.vehicleId.toString(),
      raw.clientId.toString(),
      raw.status,
      raw.price,
      raw._id.toString(),
    )
  }

  static toService(service: Service): Partial<IServiceModel> {
    return {
      description: service.description,
      serviceDate: service.serviceDate,
      vehicleId: new mongoose.Types.ObjectId(service.vehicleId),
      clientId: new mongoose.Types.ObjectId(service.clientId),
      status: service.status,
      price: service.price,
    }
  }
}
