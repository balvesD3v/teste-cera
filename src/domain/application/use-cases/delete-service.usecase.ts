import { Either, left, right } from '../../../core/either'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { ServiceRepository } from '../repositories/service.repository'

interface DeleteServiceUseCaseRequest {
  serviceId: string
}

type DeleteServiceUseCaseResponse = Either<ServiceNotFoundError, null>

export class DeleteServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({
    serviceId,
  }: DeleteServiceUseCaseRequest): Promise<DeleteServiceUseCaseResponse> {
    const service = await this.serviceRepository.findById(serviceId)

    if (!service) {
      return left(new ServiceNotFoundError())
    }

    await this.serviceRepository.delete(service)

    return right(null)
  }
}
