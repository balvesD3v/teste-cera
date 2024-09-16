import { ServiceRepository } from '../../enterprise/repositories/service.repository'

export class GetAllServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute() {
    const services = await this.serviceRepository.findAll()

    if (!services) {
      throw new Error('Não existem serviços')
    }

    return services
  }
}
