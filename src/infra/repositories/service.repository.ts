import { ServiceRepository } from '../../domain/repositories/service.repository'
import { Service } from '../../domain/entities/service.entity'
import { ServiceModel } from '../models/service.model'
import { ServiceMapper } from './mappers/service.mapper'

export class MongoServiceRepository implements ServiceRepository {
  async create(service: Service): Promise<Service> {
    const persitenceData = ServiceMapper.toService(service)
    const createdService = await ServiceModel.create(persitenceData)
    return ServiceMapper.toDomain(createdService)
  }

  async delete(id: string): Promise<void> {
    await ServiceModel.findByIdAndDelete(id).exec()
  }

  async findAll(): Promise<Service[]> {
    const mongooseDocs = await ServiceModel.find().exec()
    return mongooseDocs.map(ServiceMapper.toDomain)
  }

  async findById(id: string): Promise<Service | null> {
    const mongooseDocs = await ServiceModel.findById(id).exec()
    return mongooseDocs ? ServiceMapper.toDomain(mongooseDocs) : null
  }

  async update(service: Service): Promise<Service | null> {
    const persitenceData = ServiceMapper.toService(service)
    const updateService = await ServiceModel.findByIdAndUpdate(
      service.id,
      persitenceData,
      { new: true },
    ).exec()
    return updateService ? ServiceMapper.toDomain(updateService) : null
  }
}
