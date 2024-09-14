import { IService } from '../models/Service'

export interface IServiceRepository {
  findAll(): Promise<IService[]>
  findById(id: string): Promise<IService | null>
  create(data: Partial<IService>): Promise<IService>
  update(id: string, data: Partial<IService>): Promise<IService | null>
  delete(id: string): Promise<IService | null>
}
