import { IServiceModel } from '../../models/service.model'
import { Service } from '../../../domain/enterprise/entities/service.entity'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'

export class ServiceMapper {
  static toDomain(raw: IServiceModel): Service {
    return Service.create({
      description: raw.description,
      clientId: new UniqueEntityId(raw.clientId),
      vehicleId: new UniqueEntityId(raw.vehicleId),
      price: raw.price,
      serviceDate: raw.serviceDate,
      status: raw.status,
    })
  }

  static toService(service: Service): Partial<IServiceModel> {
    return {
      description: service.description,
      serviceDate: service.serviceDate,
      vehicleId: service.vehicleId.toString(),
      clientId: service.clientId.toString(),
      status: service.status,
      price: service.price,
    }
  }
}
