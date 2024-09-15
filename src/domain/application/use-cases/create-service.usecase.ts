import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Service } from '../../enterprise/entities/service.entity'
import { ServiceRepository } from '../../enterprise/repositories/service.repository'

interface CreateServiceUseCaseRequest {
  description: string
  serviceDate: Date
  vehicleId: string
  clientId: string
  status: 'pending' | 'completed' | 'canceled'
  price: number
}

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({
    clientId,
    description,
    price,
    serviceDate,
    status,
    vehicleId,
  }: CreateServiceUseCaseRequest): Promise<Service> {
    const service = Service.create({
      clientId: new UniqueEntityId(clientId),
      vehicleId: new UniqueEntityId(vehicleId),
      description,
      price,
      serviceDate,
      status,
    })

    return await this.serviceRepository.create(service)
  }
}
