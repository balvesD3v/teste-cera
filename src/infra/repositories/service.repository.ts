import { Service } from '../../domain/enterprise/entities/service.entity'
import { ServiceRepository } from '../../domain/enterprise/repositories/service.repository'
import { ServiceModel } from '../models/service.model'
import { ServiceMapper } from './mappers/service.mapper'

export class MongoServiceRepository implements ServiceRepository {
  async create(service: Service): Promise<Service> {
    const persitenceData = ServiceMapper.toService(service)
    const createdService = await ServiceModel.create(persitenceData)
    return ServiceMapper.toDomain(createdService)
  }

  async delete(id: string): Promise<void | null> {
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

  async update(id: string, updates: Partial<Service>): Promise<Service | null> {
    const updateService = await ServiceModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec()
    return updateService ? ServiceMapper.toDomain(updateService) : null
  }
}
