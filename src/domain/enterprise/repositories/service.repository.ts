import { Service } from '../entities/service.entity'

export interface ServiceRepository {
  findAll(): Promise<Service[]>
  findById(id: string): Promise<Service | null>
  create(service: Service): Promise<Service>
  update(service: Service): Promise<void>
  delete(id: string): Promise<void | null>
}
