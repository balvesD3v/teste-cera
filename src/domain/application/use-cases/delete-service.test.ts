import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service.repository'
import { Service } from '../../enterprise/entities/service'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { DeleteServiceUseCase } from './delete-service.usecase'

describe('DeleteServiceUseCase', () => {
  let inMemoryServiceRepository: InMemoryServiceRepository
  let deleteServiceUseCase: DeleteServiceUseCase

  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository()
    deleteServiceUseCase = new DeleteServiceUseCase(inMemoryServiceRepository)
  })

  it('should delete an existing service', async () => {
    const service = Service.create({
      description: 'Oil change',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-uuid'),
      clientId: new UniqueEntityId('client-uuid'),
      status: 'Pendente',
      price: 100,
    })

    await inMemoryServiceRepository.create(service)

    const response = await deleteServiceUseCase.execute({
      serviceId: service.id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(inMemoryServiceRepository.items).toHaveLength(0)
  })

  it('should return ServiceNotFoundError when service does not exist', async () => {
    const response = await deleteServiceUseCase.execute({
      serviceId: 'non-existent-service-id',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ServiceNotFoundError)
  })
})
