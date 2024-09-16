import { ServiceRepository } from '@/domain/enterprise/repositories/service.repository'

interface DeleteServiceUseCaseRequest {
  serviceId: string
}

export class DeleteServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ serviceId }: DeleteServiceUseCaseRequest): Promise<void> {
    const service = await this.serviceRepository.findById(serviceId)

    if (!service) {
      throw new Error('Serviço não existe')
    }

    await this.serviceRepository.delete(service)
  }
}
