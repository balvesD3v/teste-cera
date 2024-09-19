import { describe, it, expect } from 'vitest'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Service } from './service'

describe('Service Entity', () => {
  it('should create a service entity correctly', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)

    expect(service).toBeInstanceOf(Service)
    expect(service.description).toBe('Oil change')
    expect(service.serviceDate).toEqual(new Date('2024-01-01'))
    expect(service.vehicleId).toBeInstanceOf(UniqueEntityId)
    expect(service.clientId).toBeInstanceOf(UniqueEntityId)
    expect(service.status).toBe('pending')
    expect(service.price).toBe(100.0)
  })

  it('should update the description of the service', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)
    service.updateDescription('Tire replacement')

    expect(service.description).toBe('Tire replacement')
  })

  it('should update the service date', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)
    const newDate = new Date('2024-02-01')
    service.updateServiceDate(newDate)

    expect(service.serviceDate).toEqual(newDate)
  })

  it('should update the vehicleId', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)
    const newVehicleId = new UniqueEntityId()
    service.updateVehicleId(newVehicleId)

    expect(service.vehicleId).toBe(newVehicleId)
  })

  it('should update the clientId', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)
    const newClientId = new UniqueEntityId()
    service.updateClientId(newClientId)

    expect(service.clientId).toBe(newClientId)
  })

  it('should update the status of the service', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)
    service.updateStatus('Concluído')

    expect(service.status).toBe('Concluído')
  })

  it('should update the price of the service', () => {
    const serviceProps = {
      description: 'Oil change',
      serviceDate: new Date('2024-01-01'),
      vehicleId: new UniqueEntityId(),
      clientId: new UniqueEntityId(),
      status: 'Pendente' as const,
      price: 100.0,
    }

    const service = Service.create(serviceProps)
    service.updatePrice(150.0)

    expect(service.price).toBe(150.0)
  })
})
