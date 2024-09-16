import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Service } from '../../enterprise/entities/service.entity'
import { ServiceRepository } from '../../enterprise/repositories/service.repository'

interface UpdateServiceUseCaseRequest {
  serviceId: string
  description: string
  serviceDate: Date
  vehicleId: UniqueEntityId
  clientId: UniqueEntityId
  status: 'pending' | 'completed' | 'canceled'
  price: number
}

export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({
    serviceId,
    clientId,
    vehicleId,
    description,
    price,
    serviceDate,
    status,
  }: UpdateServiceUseCaseRequest): Promise<Service> {
    try {
      const service = await this.serviceRepository.findById(serviceId)

      if (!service) {
        throw new Error('Serviço não existe')
      }

      service.updateDescription(description)
      service.updatePrice(price)
      service.updateServiceDate(serviceDate)
      service.updateStatus(status)
      service.updateClientId(clientId)
      service.updateVehicleId(vehicleId)

      await this.serviceRepository.update(service)

      return service
    } catch (error) {
      throw new Error('Erro ao atualizar o serviço')
    }
  }
}
