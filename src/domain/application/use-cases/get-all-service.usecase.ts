import { Either, left, right } from '../../../core/either'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { Service } from '../../enterprise/entities/service'
import { ServiceRepository } from '../repositories/service.repository'

type GetAllServiceUseCaseResponse = Either<
  ServiceNotFoundError,
  { services: Service[] }
>

export class GetAllServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<GetAllServiceUseCaseResponse> {
    const services = await this.serviceRepository.findAll()

    if (!services) {
      return left(new ServiceNotFoundError())
    }

    return right({
      services,
    })
  }
}
