import { Either, left, right } from '../../../core/either'
import { BadRequestException } from '../../../core/errors/errors/BadRequestException'
import { Service } from '../../../domain/enterprise/entities/service'
import { ServiceRepository } from '../repositories/service.repository'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'

interface GetServicesByFiltersUseCaseRequest {
  clientId?: string
  vehicleId?: string
  status?: string
}

type GetServicesByFiltersUseCaseResponse = Either<
  BadRequestException,
  {
    services: Service[]
  }
>

export class GetServicesByFiltersUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({
    clientId,
    vehicleId,
    status,
  }: GetServicesByFiltersUseCaseRequest): Promise<GetServicesByFiltersUseCaseResponse> {
    if (!clientId && !vehicleId && !status) {
      return left(
        new BadRequestException('Pelo menos um filtro deve ser fornecido'),
      )
    }

    const services = await this.serviceRepository.findByFilters({
      clientId,
      vehicleId,
      status,
    })

    if (!services) {
      return left(new ServiceNotFoundError())
    }

    return right({ services })
  }
}
