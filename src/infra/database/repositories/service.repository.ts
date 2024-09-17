import { ServiceRepository } from '../../../domain/application/repositories/service.repository'
import { Service } from '../../../domain/enterprise/entities/service'
import { ServiceModel } from '../../models/service.model'
import { ServiceMapper } from '../mappers/service.mapper'

export class MongoServiceRepository implements ServiceRepository {
  async create(service: Service): Promise<Service> {
    const persitenceData = ServiceMapper.toService(service)
    const createdService = await ServiceModel.create(persitenceData)
    return ServiceMapper.toDomain(createdService)
  }

  async delete(service: Service): Promise<void> {
    await ServiceModel.findByIdAndDelete(service).exec()
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

  async update(service: Service): Promise<void> {
    const serviceData = ServiceMapper.toService(service)
    await ServiceModel.findByIdAndUpdate(service.id.toString(), serviceData, {
      new: true,
    }).exec()
  }
}
