import { Service } from '../../enterprise/entities/service.entity'
import { ServiceRepository } from '../../enterprise/repositories/service.repository'

export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(
    id: string,
    updates: Partial<Service>,
  ): Promise<Service | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido')
    }

    try {
      const updatedService = await this.serviceRepository.update(id, updates)
      if (!updatedService) {
        throw new Error('Serviço não encontrado')
      }
      return updatedService
    } catch (error) {
      console.error('Erro ao atualizar o serviço:', error)
      throw new Error('Erro ao atualizar o serviço')
    }
  }
}
