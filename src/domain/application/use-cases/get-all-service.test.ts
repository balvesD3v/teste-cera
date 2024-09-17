import { describe, it, expect, beforeEach } from 'vitest'
import { GetAllServiceUseCase } from './get-all-service.usecase'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service.repository'
import { Service } from '../../enterprise/entities/service'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'

describe('GetAllServiceUseCase', () => {
  let inMemoryServiceRepository: InMemoryServiceRepository
  let getAllServiceUseCase: GetAllServiceUseCase

  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository()
    getAllServiceUseCase = new GetAllServiceUseCase(inMemoryServiceRepository)
  })

  it('should return all services', async () => {
    const service1 = Service.create({
      description: 'Oil change',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-uuid-1'),
      clientId: new UniqueEntityId('client-uuid-1'),
      status: 'pending',
      price: 100,
    })

    const service2 = Service.create({
      description: 'Brake replacement',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-uuid-2'),
      clientId: new UniqueEntityId('client-uuid-2'),
      status: 'completed',
      price: 200,
    })

    await inMemoryServiceRepository.create(service1)
    await inMemoryServiceRepository.create(service2)

    const response = await getAllServiceUseCase.execute()

    if (response.isRight()) {
      expect(response.value.services).toHaveLength(2)
      expect(response.value.services).toEqual([service1, service2])
    } else {
      throw new Error('Expected Right but got Left')
    }
  })

  it('should return ServiceNotFoundError when no services are found', async () => {
    const response = await getAllServiceUseCase.execute()

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ServiceNotFoundError)
  })
})
