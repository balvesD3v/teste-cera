import { Service } from '../../domain/entities/service.entity'
import { ServiceRepository } from '../../domain/repositories/service.repository'
import { serviceSchema } from '../validators/service.validators'

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(data: Omit<Service, 'id'>): Promise<Service> {
    const parsedData = serviceSchema.parse(data)
    const service = new Service(
      parsedData.description,
      parsedData.serviceDate,
      parsedData.vehicleId,
      parsedData.clientId,
      parsedData.status,
      parsedData.price,
    )
    return this.serviceRepository.create(service)
  }
}
