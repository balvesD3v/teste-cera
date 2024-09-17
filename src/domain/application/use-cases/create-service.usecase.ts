import { Either, left, right } from '../../../core/either'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { BadRequestException } from '../../../core/errors/errors/BadRequestException'
import { Service } from '../../enterprise/entities/service'
import { ServiceRepository } from '../repositories/service.repository'

interface CreateServiceUseCaseRequest {
  description: string
  serviceDate: Date
  vehicleId: string
  clientId: string
  status: 'pending' | 'completed' | 'canceled'
  price: number
}

type CreateServiceUseCaseResponse = Either<
  BadRequestException,
  {
    service: Service
  }
>

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({
    clientId,
    description,
    price,
    serviceDate,
    status,
    vehicleId,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = Service.create({
      clientId: new UniqueEntityId(clientId),
      vehicleId: new UniqueEntityId(vehicleId),
      description,
      price,
      serviceDate,
      status,
    })

    if (
      !description ||
      !serviceDate ||
      !vehicleId ||
      !clientId ||
      !status ||
      !price
    ) {
      return left(new BadRequestException('Todos os campos são obrigatórios'))
    }

    await this.serviceRepository.create(service)

    return right({
      service,
    })
  }
}
