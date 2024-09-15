import { Service } from '../entities/service.entity'

export interface ServiceRepository {
  findAll(): Promise<Service[]>
  findById(id: string): Promise<Service | null>
  create(data: Partial<Service>): Promise<Service>
  update(id: string, updates: Partial<Service>): Promise<Service | null>
  delete(id: string): Promise<void | null>
}
