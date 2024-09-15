import { Service } from '../../domain/entities/service.entity'
import { ServiceRepository } from '../../domain/repositories/service.repository'

export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(service: Service): Promise<Service | null> {
    return this.serviceRepository.update(service)
  }
}
