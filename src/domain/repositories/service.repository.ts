import { Service } from '../entities/service.entity'

export interface IServiceRepository {
  findAll(): Promise<Service[]>
  findById(id: string): Promise<Service | null>
  create(data: Partial<Service>): Promise<Service>
  update(id: string, data: Partial<Service>): Promise<Service | null>
  delete(id: string): Promise<Service | null>
}
