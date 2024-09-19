import { Either, left, right } from '../../../core/either'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { BadRequestException } from '../../../core/errors/errors/BadRequestException'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { Service } from '../../enterprise/entities/service'
import { ServiceRepository } from '../repositories/service.repository'

interface UpdateServiceUseCaseRequest {
  serviceId: string
  description: string
  serviceDate: Date
  vehicleId: UniqueEntityId
  clientId: UniqueEntityId
  status: 'Pendente' | 'Em Andamento' | 'Concluído'
  price: number
}

type UpdateServiceUseCaseResponse = Either<
  ServiceNotFoundError | BadRequestException,
  {
    service: Service
  }
>

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
  }: UpdateServiceUseCaseRequest): Promise<UpdateServiceUseCaseResponse> {
    const service = await this.serviceRepository.findById(serviceId)

    if (!service) {
      return left(new ServiceNotFoundError())
    }

    service.updateDescription(description)
    service.updatePrice(price)
    service.updateServiceDate(serviceDate)
    service.updateStatus(status)
    service.updateClientId(clientId)
    service.updateVehicleId(vehicleId)

    await this.serviceRepository.update(service)

    return right({
      service,
    })
  }
}
