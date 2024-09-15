import { Service } from '../../domain/entities/service.entity'
import { ServiceRepository } from '../../domain/repositories/service.repository'

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(data: Omit<Service, 'id'>): Promise<Service> {
    const service = new Service(
      data.description,
      data.serviceDate,
      data.vehicleId,
      data.clientId,
      data.status,
      data.price,
    )
    return this.serviceRepository.create(service)
  }
}
