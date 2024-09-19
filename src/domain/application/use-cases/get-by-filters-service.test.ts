import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service.repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Service } from '../../enterprise/entities/service'
import { BadRequestException } from '../../../core/errors/errors/BadRequestException'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { GetServicesByFiltersUseCase } from './get-by-filters-service.usecase'

describe('GetServicesByFiltersUseCase', () => {
  let inMemoryServiceRepository: InMemoryServiceRepository
  let getServicesByFiltersUseCase: GetServicesByFiltersUseCase

  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository()
    getServicesByFiltersUseCase = new GetServicesByFiltersUseCase(
      inMemoryServiceRepository,
    )
  })

  it('should return BadRequestException if no filters are provided', async () => {
    const response = await getServicesByFiltersUseCase.execute({})

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(BadRequestException)
  })

  it('should return ServiceNotFoundError if no services are found with the given filters', async () => {
    const response = await getServicesByFiltersUseCase.execute({
      clientId: 'non-existing-client-id',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ServiceNotFoundError)
  })

  it('should return services if valid filters are provided', async () => {
    const service1 = Service.create({
      description: 'Service 1',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Concluído',
      price: 100,
    })

    const service2 = Service.create({
      description: 'Service 2',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente',
      price: 200,
    })

    await inMemoryServiceRepository.create(service1)
    await inMemoryServiceRepository.create(service2)

    const response = await getServicesByFiltersUseCase.execute({
      clientId: service1.clientId.toString(),
    })

    expect(response.isRight()).toBe(true)
    if (response.isRight()) {
      expect(response.value.services).toEqual([service1])
    }
  })
})
