import { ServiceQuery } from 'src/infra/@types/serviceQuery'
import { ServiceRepository } from '../../../domain/application/repositories/service.repository'
import { Service } from '../../../domain/enterprise/entities/service'
import { ServiceModel } from '../../models/service.model'
import { ServiceMapper } from '../mappers/service.mapper'

export class MongoServiceRepository implements ServiceRepository {
  async create(service: Service): Promise<void> {
    const persistenceData = ServiceMapper.toService(service)
    await ServiceModel.create({
      ...persistenceData,
      _id: service.id.toString(),
    })
  }

  async delete(service: Service): Promise<void> {
    await ServiceModel.findByIdAndDelete(service.id.toString()).exec()
  }

  async findAll(): Promise<Service[] | null> {
    const mongooseDocs = await ServiceModel.find().exec()
    return mongooseDocs.map(ServiceMapper.toDomain)
  }

  async findById(id: string): Promise<Service | null> {
    const service = await ServiceModel.findById(id).exec()

    if (!service) {
      return null
    }

    return ServiceMapper.toDomain(service)
  }

  async findByFilters(filters: {
    clientId?: string
    vehicleId?: string
    status?: string
  }): Promise<Service[] | null> {
    const query: ServiceQuery = {}

    if (filters.clientId) {
      query.clientId = filters.clientId
    }

    if (filters.vehicleId) {
      query.vehicleId = filters.vehicleId
    }

    if (filters.status) {
      query.status = filters.status
    }

    const services = await ServiceModel.find(query).exec()

    return services.map(ServiceMapper.toDomain)
  }

  async update(service: Service): Promise<void> {
    const serviceData = ServiceMapper.toService(service)
    await ServiceModel.findByIdAndUpdate(service.id.toString(), serviceData, {
      new: true,
    }).exec()
  }
}
