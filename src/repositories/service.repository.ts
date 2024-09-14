import { IServiceRepository } from '../interface/service.repository'
import Service, { IService } from '../models/Service'

export class ServiceRepository implements IServiceRepository {
  async create(data: Partial<IService>): Promise<IService> {
    const service = new Service(data)
    return service.save()
  }

  delete(id: string): Promise<IService | null> {
    return Service.findByIdAndDelete(id).exec()
  }

  findAll(): Promise<IService[]> {
    return Service.find().exec()
  }

  findById(id: string): Promise<IService | null> {
    return Service.findById(id).exec()
  }

  update(id: string, data: Partial<IService>): Promise<IService | null> {
    return Service.findByIdAndUpdate(id, data, { new: true }).exec()
  }
}
