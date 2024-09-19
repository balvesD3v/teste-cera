import { Service } from '../../enterprise/entities/service'

export interface ServiceRepository {
  findAll(): Promise<Service[] | null>
  findById(id: string): Promise<Service | null>
  findByFilters(filters: {
    clientId?: string
    vehicleId?: string
    status?: string
  }): Promise<Service[] | null>
  create(service: Service): Promise<void>
  update(service: Service): Promise<void>
  delete(service: Service): Promise<void>
}
