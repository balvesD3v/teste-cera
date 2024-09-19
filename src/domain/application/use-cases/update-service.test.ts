import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service.repository'
import { UpdateServiceUseCase } from './update-service.usecase'
import { Service } from 'src/domain/enterprise/entities/service'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

describe('UpdateServiceUseCase', () => {
  let serviceRepository: InMemoryServiceRepository
  let updateServiceUseCase: UpdateServiceUseCase

  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
  })

  it('should update a service successfully', async () => {
    const initialService = Service.create({
      description: 'Initial Description',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-123'),
      clientId: new UniqueEntityId('client-123'),
      status: 'Pendente',
      price: 100,
    })

    await serviceRepository.create(initialService)

    const updatedDescription = 'Updated Description'
    const request = {
      serviceId: initialService.id.toString(),
      description: updatedDescription,
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-456'),
      clientId: new UniqueEntityId('client-456'),
      status: 'Concluído' as const,
      price: 150,
    }

    const response = await updateServiceUseCase.execute(request)

    expect(response.isRight()).toBe(true)
    if (response.isRight()) {
      const updatedService = response.value.service
      expect(updatedService.description).toBe(updatedDescription)
      expect(updatedService.price).toBe(150)
      expect(updatedService.status).toBe('Concluído')
    }
  })

  it('should return ServiceNotFoundError if service does not exist', async () => {
    const request = {
      serviceId: 'non-existent-id',
      description: 'Updated Description',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-456'),
      clientId: new UniqueEntityId('client-456'),
      status: 'Concluído' as const,
      price: 150,
    }

    const response = await updateServiceUseCase.execute(request)

    expect(response.isLeft()).toBe(true)
    if (response.isLeft()) {
      expect(response.value.message).toBe('Serviço não encontrado')
    }
  })
})
