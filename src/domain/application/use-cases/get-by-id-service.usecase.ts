import { ServiceRepository } from '../../enterprise/repositories/service.repository'

interface GetByIdServiceUseCaseRequest {
  serviceId: string
}

export class GetByIdServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ serviceId }: GetByIdServiceUseCaseRequest) {
    const service = await this.serviceRepository.findById(serviceId)

    if (!service) {
      throw new Error('Serviço não encotrado')
    }

    return service
  }
}
