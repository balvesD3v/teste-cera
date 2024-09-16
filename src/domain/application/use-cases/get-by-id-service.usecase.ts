import { Either, left, right } from '../../../core/either'
import { BadRequestException } from '../../../core/errors/errors/BadRequestException'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { Service } from '../../enterprise/entities/service.entity'
import { ServiceRepository } from '../../enterprise/repositories/service.repository'

interface GetByIdServiceUseCaseRequest {
  serviceId: string
}

type GetByIdServiceUseCaseResponse = Either<
  ServiceNotFoundError | BadRequestException,
  {
    service: Service
  }
>

export class GetByIdServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({
    serviceId,
  }: GetByIdServiceUseCaseRequest): Promise<GetByIdServiceUseCaseResponse> {
    const service = await this.serviceRepository.findById(serviceId)

    if (!service) {
      return left(new ServiceNotFoundError())
    }

    return right({
      service,
    })
  }
}
