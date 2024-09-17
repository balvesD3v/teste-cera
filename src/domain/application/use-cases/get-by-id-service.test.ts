import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryServiceRepository } from '../../../../test/repositories/in-memory-service.repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Service } from '../../enterprise/entities/service'
import { ServiceNotFoundError } from '../../../core/errors/errors/ServiceNotFoundError'
import { GetByIdServiceUseCase } from './get-by-id-service.usecase'

describe('GetByIdServiceUseCase', () => {
  let inMemoryServiceRepository: InMemoryServiceRepository
  let getByIdServiceUseCase: GetByIdServiceUseCase

  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository()
    getByIdServiceUseCase = new GetByIdServiceUseCase(inMemoryServiceRepository)
  })

  it('should return a service if found by ID', async () => {
    const service = Service.create({
      description: 'Service 1',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'pending',
      price: 100,
    })
    await inMemoryServiceRepository.create(service)

    const response = await getByIdServiceUseCase.execute({
      serviceId: service.id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(response.value).toEqual({ service })
  })

  it('should return ServiceNotFoundError if service does not exist', async () => {
    const response = await getByIdServiceUseCase.execute({
      serviceId: 'non-existing-id',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ServiceNotFoundError)
  })

  it('should return BadRequestException if serviceId is invalid', async () => {
    const response = await getByIdServiceUseCase.execute({
      serviceId: '',
    })

    expect(response.isLeft()).toBe(true)

    if (response.isLeft()) {
      const error = response.value
      expect(error.constructor.name).toBe('BadRequestException')
      expect(error.message).toBe('serviceId não pode ser vazio')
    }
  })
})
