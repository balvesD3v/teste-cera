import { describe, it, expect, beforeEach } from 'vitest'
import { CreateServiceUseCase } from './create-service.usecase'
import { BadRequestException } from '../../../core/errors/errors/BadRequestException'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service.repository'

describe('CreateServiceUseCase', () => {
  let serviceRepository: InMemoryServiceRepository
  let createServiceUseCase: CreateServiceUseCase

  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    createServiceUseCase = new CreateServiceUseCase(serviceRepository)
  })

  it('should create a service successfully', async () => {
    const request = {
      description: 'Oil change',
      serviceDate: new Date(),
      vehicleId: 'vehicle-uuid',
      clientId: 'client-uuid',
      status: 'Pendente' as const,
      price: 100,
    }

    const response = await createServiceUseCase.execute(request)

    expect(response.isRight()).toBe(true)
    if (response.isRight()) {
      const { service } = response.value
      expect(service.description).toBe(request.description)
      expect(service.price).toBe(request.price)
      expect(service.status).toBe(request.status)
      expect(service.clientId.toString()).toBe(request.clientId)
      expect(service.vehicleId.toString()).toBe(request.vehicleId)
    }

    expect(serviceRepository.items).toHaveLength(1)
  })

  it('should return BadRequestException when missing fields', async () => {
    const request = {
      description: '',
      serviceDate: new Date(),
      vehicleId: 'vehicle-uuid',
      clientId: 'client-uuid',
      status: 'Pendente' as const,
      price: 100,
    }

    const response = await createServiceUseCase.execute(request)

    expect(response.isLeft()).toBe(true)
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(BadRequestException)
      expect(response.value.message).toBe('Todos os campos são obrigatórios')
    }

    expect(serviceRepository.items).toHaveLength(0)
  })

  it('should not create service with invalid price', async () => {
    const request = {
      description: 'Brake inspection',
      serviceDate: new Date(),
      vehicleId: 'vehicle-uuid',
      clientId: 'client-uuid',
      status: 'Pendente' as const,
      price: 0, // invalid price
    }

    const response = await createServiceUseCase.execute(request)

    expect(response.isLeft()).toBe(true)
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(BadRequestException)
      expect(response.value.message).toBe('Todos os campos são obrigatórios')
    }

    expect(serviceRepository.items).toHaveLength(0)
  })
})
