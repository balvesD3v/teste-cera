import { Model, Types } from 'mongoose'
import { IServiceRepository } from '../interface/service.repository'
import Service, { IService } from '../models/Service'

export class ServiceRepository implements IServiceRepository {
  private model: Model<IService>

  constructor() {
    this.model = Service
  }

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
    const objectId = new Types.ObjectId(id)
    return Service.findByIdAndUpdate(objectId, data, { new: true }).exec()
  }
}
